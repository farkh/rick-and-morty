import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import PartyItem from './PartyItem'
import { Character, CharacterType } from '../Characters/CharacterItem'

interface PartyProps {
    characters: Character[]
}

const Party: React.SFC<PartyProps> = props => {
    const { characters } = props
    // Если добавится Саммер (например) - не придется новый prop добавлять, просто новую карточку и тип добавить
    const rick = characters.filter(character => character.name.toLowerCase().includes(CharacterType.Rick.toLowerCase()))?.[0]
    const morty = characters.filter(character => character.name.toLowerCase().includes(CharacterType.Morty.toLowerCase()))?.[0]

    return (
        <Grid item xs={12} container justify="center">
            <Grid item xs={12} container justify="center">
                <Box mb={2} mt={4}>
                    <Typography variant="h5">Party</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} container spacing={2} justify="center" wrap="wrap">
                <PartyItem
                    key={rick?.id}
                    type={CharacterType.Rick}
                    character={rick}
                />

                <PartyItem
                    key={morty?.id}
                    type={CharacterType.Morty}
                    character={morty}
                />
            </Grid>
        </Grid>
    )
}

export default React.memo(Party)
