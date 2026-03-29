'use client'

import { useState } from 'react'
import OrganizationList from '../components/OrganizationList'
import OrganizationForm from '../components/OrganizationForm'

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0)

    return (
        <div>
            <main>
                <h1>Telpark App</h1>
                <OrganizationForm
                    onCreated={() => setRefreshKey((k) => k + 1)}
                />
                <OrganizationList refreshKey={refreshKey} />
            </main>
        </div>
    )
}
