import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import { Search } from '../../components/Search/Search'
import { Characters } from '../../components/Characters/Characters'
import { Character, CharacterType } from '../../components/Characters/CharacterItem'
import Party from '../../components/Party/Party'

const GET_CHARACTERS = gql`
    query getCharacters($searchString: String) {
        characters(filter: { name: $searchString }) {
            results {
                id
                name
                image
            }
        }
    }
`

export const PartyApp: React.FC = () => {
    const [searchString, setSearchString] = useState<string>('')
    const [removedCharacters, setRemovedCharacters] = useState<string[]>([])
    const [partyParticipants, setPartyParticipants] = useState<Character[]>([])
    const { loading, data } = useQuery(GET_CHARACTERS, { skip: searchString.length < 3, variables: { searchString } })
    const characters: Character[] = data?.characters?.results?.filter((character: Character) => 
      !removedCharacters.includes(character.id)) || []

    const handleCharacterClick = (item: Character): void => {
      const isMorty = item.name.toLowerCase().includes(CharacterType.Morty.toLowerCase())
      const isRick = item.name.toLowerCase().includes(CharacterType.Rick.toLowerCase())

      if (isMorty) {
        setPartyParticipants([
          ...partyParticipants.filter(participant => !participant.name.toLowerCase().includes(CharacterType.Morty.toLowerCase())),
          item,
        ])
      }

      if (isRick) {
        setPartyParticipants([
          ...partyParticipants.filter(participant => !participant.name.toLowerCase().includes(CharacterType.Rick.toLowerCase())),
          item,
        ])
      }
    }

    return (
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12}>
            <Box mb={2}>
              <Search value={searchString} onChange={setSearchString} />
            </Box>
          </Grid>

          <Characters
            items={characters}
            isLoading={loading}
            onRemoveCharacter={(id: string) => setRemovedCharacters([...removedCharacters, id])}
            onCharacterClick={handleCharacterClick}
          />

          <Party characters={partyParticipants} />

          <Grid item xs={12}>
            <Box mb={2} />
          </Grid>
        </Grid>
    )
}
