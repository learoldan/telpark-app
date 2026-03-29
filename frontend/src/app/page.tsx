'use client'

import { useState } from 'react'
import OrganizationList from '../components/OrganizationList'
import OrganizationForm from '../components/OrganizationForm'
import ChargePointList from '../components/ChargePointList'
import ChargePointForm from '../components/ChargePointForm'

type View = 'organizations' | 'charge-points' | null

export default function Home() {
    const [view, setView] = useState<View>('organizations')
    const [refreshKey, setRefreshKey] = useState(0)

    function handleViewChange(selected: View) {
        setView(selected)
        setRefreshKey(0)
    }

    return (
        <div>
            <main>
                <h1>Telpark App</h1>

                <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                    <button onClick={() => handleViewChange('organizations')}>
                        Ver Organizaciones
                    </button>
                    <button onClick={() => handleViewChange('charge-points')}>
                        Ver Puntos de Carga
                    </button>
                </div>

                {view === 'organizations' && (
                    <>
                        <OrganizationForm
                            onCreated={() => setRefreshKey((k) => k + 1)}
                        />
                        <OrganizationList refreshKey={refreshKey} />
                    </>
                )}

                {view === 'charge-points' && (
                    <>
                        <ChargePointForm
                            onCreated={() => setRefreshKey((k) => k + 1)}
                        />
                        <ChargePointList refreshKey={refreshKey} />
                    </>
                )}
            </main>
        </div>
    )
}
