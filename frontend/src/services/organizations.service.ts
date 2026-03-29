const ORG_API_URL = '/api/organizations'
import { Organization } from '../types/organization'

export async function getOrganizations(): Promise<Organization[]> {
    const response = await fetch(ORG_API_URL)
    return response.json()
}

export async function getOrganizationById(id: string): Promise<Organization> {
    const response = await fetch(`${ORG_API_URL}/${id}`)
    return response.json()
}

export async function createOrganization(data: {
    name: string
    legalEntity: string
}): Promise<Organization> {
    const response = await fetch(ORG_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body?.message ?? 'Error al crear la organización')
    }
    return response.json()
}

export async function updateOrganization(
    id: string,
    data: { name?: string; legalEntity?: string },
): Promise<Organization> {
    const response = await fetch(`${ORG_API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return response.json()
}

export async function deleteOrganization(id: string): Promise<void> {
    await fetch(`${ORG_API_URL}/${id}`, {
        method: 'DELETE',
    })
}
