import React from 'react'
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export interface Character {
    id: string
    name: string
    image: string
}

export enum CharacterType {
    Morty = 'Morty',
    Rick = 'Rick',
}

export const CharacterItemCard = styled(Grid)`
    height: 300px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: all .3s linear;

    &:hover {
        transform: scale(1.05);
    }
`

export const CharacterItemImage = styled.img`
    height: 100%;
`

const CharacterItemRemoveButton = styled(IconButton)`
    position: absolute;
    top: 12px;
    right: 0;
    background: rgba(255, 255, 255, .4);
    transition: background .3s linear;

    &:hover {
        background: rgba(255, 255, 255, .8);
    }
`

interface CharacterItemProps {
    item: Character
    onRemoveClick: (id: string) => void
    onItemClick: (id: Character) => void
}

const CharacterItem: React.SFC<CharacterItemProps> = props => {
    const { item, onRemoveClick, onItemClick } = props

    return (
        <CharacterItemCard item xs={3} onClick={() => onItemClick(item)}>
            <CharacterItemImage src={item.image} alt={item.name} />
            <CharacterItemRemoveButton onClick={(e: any) => {
                e.stopPropagation()
                onRemoveClick(item.id)}
            }>
                <CloseIcon />
            </CharacterItemRemoveButton>
        </CharacterItemCard>
    )
}

export default React.memo(CharacterItem)
