import React from 'react'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import CharacterItem, { Character } from './CharacterItem'

interface CharactersProps {
    items?: Character[]
    isLoading: boolean
    onRemoveCharacter: (id: string) => void
    onCharacterClick: (id: Character) => void
}

export const Characters: React.FC<CharactersProps> = props => {
    const { items, isLoading, onRemoveCharacter, onCharacterClick } = props

    return (
        <Grid item xs={12} container spacing={3} justify="center" wrap="wrap">
            {isLoading && <CircularProgress />}
            {!isLoading && items?.map(item => (
                <CharacterItem
                    key={item.id}
                    item={item}
                    onRemoveClick={onRemoveCharacter}
                    onItemClick={onCharacterClick}
                />
            ))}
        </Grid>
    )
}
