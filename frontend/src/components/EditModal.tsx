'use client'

import { useEffect, useState } from 'react'

export type FieldDef = {
    key: string
    label: string
    required?: boolean
}

type EditModalProps = {
    title: string
    fields: FieldDef[]
    initialValues: Record<string, string>
    onSave: (values: Record<string, string>) => Promise<void>
    onCancel: () => void
}

export default function EditModal({
    title,
    fields,
    initialValues,
    onSave,
    onCancel,
}: EditModalProps) {
    const [values, setValues] = useState<Record<string, string>>(initialValues)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setValues(initialValues)
    }, [initialValues])

    function handleChange(key: string, value: string) {
        setValues((prev) => ({ ...prev, [key]: value }))
    }

    async function handleSave() {
        setSaving(true)
        try {
            await onSave(values)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>{title}</h2>
                {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '0.75rem' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '0.25rem',
                            }}
                        >
                            {field.label}
                        </label>
                        <input
                            type='text'
                            value={values[field.key] ?? ''}
                            required={field.required}
                            onChange={(e) =>
                                handleChange(field.key, e.target.value)
                            }
                            style={{ width: '100%', padding: '0.4rem' }}
                        />
                    </div>
                ))}
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'flex-end',
                    }}
                >
                    <button onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={onCancel} disabled={saving}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
}

const modalStyle: React.CSSProperties = {
    background: '#fff',
    color: '#111',
    borderRadius: '8px',
    padding: '1.5rem',
    minWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
}
