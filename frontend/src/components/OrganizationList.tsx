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
                        <strong>{org.name}</strong>
                        {org.legalEntity && ` — ${org.legalEntity}`}
                        <span
                            style={{
                                marginLeft: '1rem',
                                display: 'inline-flex',
                                gap: '0.5rem',
                            }}
                        >
                            <button onClick={() => handleEditClick(org.id)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(org.id)}>
                                Delete
                            </button>
                            <button onClick={() => {}}>ChargePoints</button>
                        </span>
                    </li>
                ))}
            </ul>

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
