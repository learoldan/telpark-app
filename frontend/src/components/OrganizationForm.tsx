'use client'

import { useState } from 'react'
import { createOrganization } from '../services/organizations.service'

export default function OrganizationForm({
    onCreated,
}: {
    onCreated: () => void
}) {
    const [name, setName] = useState('')
    const [legalEntity, setLegalEntity] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!name) return
        setError(null)
        setLoading(true)
        try {
            await createOrganization({ name, legalEntity })
            setName('')
            setLegalEntity('')
            onCreated()
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al crear la organización',
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Nombre'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type='text'
                placeholder='Entidad legal'
                value={legalEntity}
                onChange={(e) => setLegalEntity(e.target.value)}
            />
            <button className='btn-primary' type='submit' disabled={loading}>
                {loading ? 'Creando...' : 'Crear organización'}
            </button>
            {error && <p className='form-error'>{error}</p>}
        </form>
    )
}
