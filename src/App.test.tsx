import { getCharacter } from './components/Party/Party'
import { Character, CharacterType } from './components/Characters/CharacterItem'
import { getUniqueByTypeCharacters, getPartyParticipants } from './pages/party-app/party-app'

const fakeCharacters: Character[] = [
  { id: '1', image: '', name: 'Rick Sanchez' },
  { id: '2', image: '', name: 'Morty Smith' },
  { id: '3', image: '', name: 'Alien Summer Smith' },
  { id: '4', image: '', name: 'Jerry Smith' },
]

describe('<Party />', () => {
  it('Should return correct character', () => {
    const rick = fakeCharacters[0]
    const morty = fakeCharacters[1]

    expect(getCharacter({ characters: fakeCharacters, type: CharacterType.Rick })).toBe(rick)
    expect(getCharacter({ characters: fakeCharacters, type: CharacterType.Morty })).toBe(morty)
  })
})

describe('Party page', () => {
  it('Should return unique characters (Morty)', () => {
    const newMorty: Character = { id: '5', image: '', name: 'Alien Morty' }
    const result = getUniqueByTypeCharacters({ characters: fakeCharacters, item: newMorty, type: CharacterType.Morty })
      .findIndex(character => character.name === 'Morty Smith')

    expect(result).toBe(-1)
  })

  it('Should return unique characters (Rick)', () => {
    const newRick: Character = { id: '6', image: '', name: 'Alien rick' }
    const result = getUniqueByTypeCharacters({ characters: fakeCharacters, item: newRick, type: CharacterType.Rick })
      .findIndex(character => character.name === 'Rick Sanchez')

    expect(result).toBe(-1)
  })

  describe('Party pariticipants / Initial empty', () => {
    const participants: Character[] = []

    it('Should add Rick to empty participants', () => {
      const newParticipant: Character = { id: '1', image: '', name: 'Rick' }
      const result = getPartyParticipants({ participants, newParticipant })

      expect(result?.length).toBe(1)
      expect(result?.[0]).toBe(newParticipant)
    })

    it('Should add Morty to empty participants', () => {
      const newParticipant: Character = { id: '1', image: '', name: 'Morty' }
      const result = getPartyParticipants({ participants, newParticipant })

      expect(result?.length).toBe(1)
      expect(result?.[0]).toBe(newParticipant)
    })

    it('Should not add Summer to party participants', () => {
      const newParticipant: Character = { id: '1', image: '', name: 'Summer' }
      const result = getPartyParticipants({ participants, newParticipant })

      expect(result.length).toBe(0)
      expect(result).toBe(participants)
    })
  })

  describe('Party pariticipants / Initial participants', () => {
    const participants: Character[] = [
      { id: '1', image: '', name: 'Rick Sanchez' },
      { id: '2', image: '', name: 'Morty Smith' },
    ]

    it('Should not add Summer to party participants', () => {
      const newParticipant: Character = { id: '1', image: '', name: 'Summer' }
      const result = getPartyParticipants({ participants, newParticipant })

      expect(result?.length).toBe(2)
      expect(result).toBe(participants)
    })

    it('Should replace Morty on participants list', () => {
      const newParticipant: Character = { id: '3', image: '', name: 'Alien Morty' }
      const result = getPartyParticipants({ participants, newParticipant })

      expect(result?.length).toBe(2)
      expect(result?.find(character => character.name === 'Morty Smith')).toBeFalsy()
      expect(result?.find(character => character.name === 'Alien Morty')).toBeTruthy()
    })

    it('Should replace Rick on participants list', () => {
      const newParticipant: Character = { id: '3', image: '', name: 'Alien Rick' }
      const result = getPartyParticipants({ participants, newParticipant })

      expect(result?.length).toBe(2)
      expect(result?.find(character => character.name === 'Rick Sanchez')).toBeFalsy()
      expect(result?.find(character => character.name === 'Alien Rick')).toBeTruthy()
    })
  })
})
