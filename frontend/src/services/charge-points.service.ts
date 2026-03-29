const CHARGE_POINT_API_URL = '/api/charge-points'
import { ChargePoint } from '@/types/charge-point'

export async function getChargePoints(): Promise<ChargePoint[]> {
    const response = await fetch(CHARGE_POINT_API_URL)
    return response.json()
}

export async function getChargePointById(id: string): Promise<ChargePoint> {
    const response = await fetch(`${CHARGE_POINT_API_URL}/${id}`)
    return response.json()
}

export async function getChargePointsByCpo(
    cpo: string,
): Promise<ChargePoint[]> {
    const response = await fetch(`${CHARGE_POINT_API_URL}/cpo/${cpo}`)
    return response.json()
}

export async function createChargePoint(data: {
    identity: string
    cpo: string
}): Promise<ChargePoint> {
    const response = await fetch(CHARGE_POINT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body?.message ?? 'Error al crear el punto de carga')
    }
    return response.json()
}

export async function updateChargePoint(
    id: string,
    data: { identity?: string },
): Promise<ChargePoint> {
    const response = await fetch(`${CHARGE_POINT_API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return response.json()
}

export async function deleteChargePoint(id: string): Promise<void> {
    await fetch(`${CHARGE_POINT_API_URL}/${id}`, {
        method: 'DELETE',
    })
}
