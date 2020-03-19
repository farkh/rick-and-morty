import React from 'react'
import TextField from '@material-ui/core/TextField'

interface SearchProps {
    value: string
    onChange: (value: string) => void
}

export const Search: React.FC<SearchProps> = props => {
    let timeout: any = null

    const handleSearchStringChange = (searchString: string): void => {
        timeout = null
        props.onChange(searchString)
    }

    return (
        <TextField
            variant="outlined"
            label="Search"
            fullWidth
            onKeyUp={(e: any) => {
                const { value } = e.target
                // if (value.length > 2 || value.length === 0) {
                    if (timeout != null) clearTimeout(timeout)
                    timeout = setTimeout(() => handleSearchStringChange(value), 300)
                // }
            }}
        />
    )
}
