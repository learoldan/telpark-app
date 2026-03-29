'use client'

import { useState } from 'react'
import { createChargePoint } from '../services/charge-points.service'

export default function ChargePointForm({
    onCreated,
    fixedCpo,
}: {
    onCreated: () => void
    fixedCpo?: string
}) {
    const [identity, setIdentity] = useState('')
    const [cpo, setCpo] = useState(fixedCpo ?? '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!identity || !cpo) return
        setError(null)
        setLoading(true)
        try {
            await createChargePoint({ identity, cpo })
            setIdentity('')
            if (!fixedCpo) setCpo('')
            onCreated()
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al crear el punto de carga',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Identidad'
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                required
            />
            <input
                type='text'
                placeholder='CPO'
                value={cpo}
                onChange={(e) => setCpo(e.target.value)}
                required
                readOnly={!!fixedCpo}
                style={
                    fixedCpo
                        ? {
                              background: '#f0f0f0',
                              color: '#888',
                              cursor: 'not-allowed',
                          }
                        : undefined
                }
            />
            <button className='btn-primary' type='submit' disabled={loading}>
                {loading ? 'Creando...' : 'Crear punto de carga'}
            </button>
            {error && <p className='form-error'>{error}</p>}
        </form>
    )
}
