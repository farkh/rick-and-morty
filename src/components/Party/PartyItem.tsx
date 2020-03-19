import React from 'react'
import styled from 'styled-components'

import Typography from '@material-ui/core/Typography'
import { Character, CharacterItemCard, CharacterItemImage, CharacterType } from '../Characters/CharacterItem'

const PartyItemTitle = styled(Typography)`
    position: absolute;
    bottom: 10px;
`

const PartyItemCard = styled(CharacterItemCard)`
    background: rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
    margin: 0 15px;
    padding: 0 !important;

    &:hover {
        transform: none;
    }
`

interface PartyItemProps {
    character?: Character
    type: CharacterType
}

const PartyItem: React.SFC<PartyItemProps> = props => {
    const { character, type } = props

    return (
        <PartyItemCard item xs={3}>
            {character && <CharacterItemImage src={character?.image} alt={character?.name} />}
            {!character && <PartyItemTitle variant="h6">{type}</PartyItemTitle>}
        </PartyItemCard>
    )
}

export default React.memo(PartyItem)
