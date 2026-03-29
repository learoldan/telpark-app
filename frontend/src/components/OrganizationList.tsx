'use client'

import { useEffect, useState } from 'react'
import { Organization } from '../types/organization'
import {
    getOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
} from '../services/organizations.service'
import EditModal, { FieldDef } from './EditModal'
import ChargePointList from './ChargePointList'
import ChargePointForm from './ChargePointForm'

const ORG_FIELDS: FieldDef[] = [
    { key: 'name', label: 'Nombre', required: true },
    { key: 'legalEntity', label: 'Entidad legal' },
]

export default function OrganizationList({
    refreshKey,
}: {
    refreshKey: number
}) {
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [loading, setLoading] = useState(true)
    const [editingOrg, setEditingOrg] = useState<Organization | null>(null)
    const [chargePointsCpo, setChargePointsCpo] = useState<string | null>(null)
    const [cpRefreshKey, setCpRefreshKey] = useState(0)

    useEffect(() => {
        getOrganizations()
            .then(setOrganizations)
            .finally(() => setLoading(false))
    }, [refreshKey])

    async function handleEditClick(id: string) {
        const org = await getOrganizationById(id)
        setEditingOrg(org)
    }

    async function handleSave(values: Record<string, string>) {
        if (!editingOrg) return
        await updateOrganization(editingOrg.id, {
            name: values.name,
            legalEntity: values.legalEntity,
        })
        const updated = await getOrganizations()
        setOrganizations(updated)
        setEditingOrg(null)
    }

    async function handleDelete(id: string) {
        await deleteOrganization(id)
        setOrganizations((prev) => prev.filter((o) => o.id !== id))
    }

    if (loading) return <p>Cargando organizaciones...</p>
    if (organizations.length === 0) return <p>No hay organizaciones.</p>

    return (
        <>
            <ul>
                {organizations.map((org) => (
                    <li key={org.id} style={{ marginBottom: '0.5rem' }}>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem 1.5rem',
                            }}
                        >
                            <span>
                                <span className='field-label'>Nombre:</span>{' '}
                                <strong>{org.name}</strong>
                            </span>
                            {org.legalEntity && (
                                <span>
                                    <span className='field-label'>
                                        Entidad legal:
                                    </span>{' '}
                                    {org.legalEntity}
                                </span>
                            )}
                        </div>
                        <span
                            style={{
                                marginLeft: 'auto',
                                display: 'inline-flex',
                                gap: '0.5rem',
                                flexShrink: 0,
                            }}
                        >
                            <button
                                className='btn-primary'
                                onClick={() => handleEditClick(org.id)}
                            >
                                Editar
                            </button>
                            <button
                                className='btn-secondary'
                                onClick={() => handleDelete(org.id)}
                            >
                                Eliminar
                            </button>
                            <button
                                className='btn-secondary'
                                onClick={() =>
                                    setChargePointsCpo(
                                        chargePointsCpo === org.name
                                            ? null
                                            : org.name,
                                    )
                                }
                            >
                                {chargePointsCpo === org.name
                                    ? 'Ocultar Puntos de Carga'
                                    : 'Puntos de Carga'}
                            </button>
                        </span>
                    </li>
                ))}
            </ul>

            {chargePointsCpo && (
                <div
                    style={{
                        margin: '1rem 0',
                        padding: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                    }}
                >
                    <h3>Puntos de carga de {chargePointsCpo}</h3>
                    <ChargePointForm
                        fixedCpo={chargePointsCpo}
                        onCreated={() => setCpRefreshKey((k) => k + 1)}
                    />
                    <ChargePointList
                        refreshKey={cpRefreshKey}
                        cpo={chargePointsCpo}
                    />
                </div>
            )}

            {editingOrg && (
                <EditModal
                    title='Editar organización'
                    fields={ORG_FIELDS}
                    initialValues={{
                        name: editingOrg.name,
                        legalEntity: editingOrg.legalEntity ?? '',
                    }}
                    onSave={handleSave}
                    onCancel={() => setEditingOrg(null)}
                />
            )}
        </>
    )
}
