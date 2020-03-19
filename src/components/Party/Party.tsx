import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import PartyItem from './PartyItem'
import { Character, CharacterType } from '../Characters/CharacterItem'

interface PartyProps {
    // Если добавится Саммер (например) - не придется новый prop добавлять, просто новую карточку и тип добавить
    characters: Character[]
}

export const getCharacter = ({ characters, type }: { characters: Character[], type: CharacterType }): Character =>
    characters.filter(character => character.name.toLowerCase().includes(type.toLowerCase()))?.[0]

const Party: React.SFC<PartyProps> = props => {
    const { characters } = props
    const rick = getCharacter({ characters, type: CharacterType.Rick })
    const morty = getCharacter({ characters, type: CharacterType.Morty })

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
