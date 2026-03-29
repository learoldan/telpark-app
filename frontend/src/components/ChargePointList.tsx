'use client'

import { useEffect, useState } from 'react'
import { ChargePoint } from '../types/charge-point'
import {
    getChargePoints,
    getChargePointsByCpo,
    getChargePointById,
    updateChargePoint,
    deleteChargePoint,
} from '../services/charge-points.service'
import EditModal, { FieldDef } from './EditModal'

const CP_FIELDS: FieldDef[] = [
    { key: 'identity', label: 'Identidad', required: true },
]

export default function ChargePointList({
    refreshKey,
    cpo,
}: {
    refreshKey: number
    cpo?: string
}) {
    const [chargePoints, setChargePoints] = useState<ChargePoint[]>([])
    const [loading, setLoading] = useState(true)
    const [editingCp, setEditingCp] = useState<ChargePoint | null>(null)

    useEffect(() => {
        const fetch = cpo ? () => getChargePointsByCpo(cpo) : getChargePoints
        fetch()
            .then(setChargePoints)
            .finally(() => setLoading(false))
    }, [refreshKey, cpo])

    async function handleEditClick(id: string) {
        const cp = await getChargePointById(id)
        setEditingCp(cp)
    }

    async function handleSave(values: Record<string, string>) {
        if (!editingCp) return
        await updateChargePoint(editingCp.id, { identity: values.identity })
        const updated = await (cpo
            ? getChargePointsByCpo(cpo)
            : getChargePoints())
        setChargePoints(updated)
        setEditingCp(null)
    }

    async function handleDelete(id: string) {
        await deleteChargePoint(id)
        setChargePoints((prev) => prev.filter((cp) => cp.id !== id))
    }

    if (loading) return <p>Cargando charge points...</p>
    if (chargePoints.length === 0) return <p>No hay charge points.</p>

    return (
        <>
            <ul>
                {chargePoints.map((cp) => (
                    <li key={cp.id} style={{ marginBottom: '0.5rem' }}>
                        <span>
                            <span className='field-label'>Identidad:</span>{' '}
                            <strong>{cp.identity}</strong>
                        </span>
                        <span>
                            <span className='field-label'>CPO:</span> {cp.cpo}
                        </span>
                        <span
                            style={{
                                marginLeft: '1rem',
                                display: 'inline-flex',
                                gap: '0.5rem',
                            }}
                        >
                            <button
                                className='btn-primary'
                                onClick={() => handleEditClick(cp.id)}
                            >
                                Editar
                            </button>
                            <button
                                className='btn-secondary'
                                onClick={() => handleDelete(cp.id)}
                            >
                                Eliminar
                            </button>
                        </span>
                    </li>
                ))}
            </ul>

            {editingCp && (
                <EditModal
                    title='Editar charge point'
                    fields={CP_FIELDS}
                    initialValues={{ identity: editingCp.identity }}
                    onSave={handleSave}
                    onCancel={() => setEditingCp(null)}
                />
            )}
        </>
    )
}
