import {
  BunnyFace,
  TanniFace,
  TongkiFace,
  BunnyGG,
  TongkiGG,
  TanniGG,
  TanniStep03,
  TanniStep02,
  TanniStep01,
  BunnyStep03,
  TongkiStep03,
  TongkiStep02,
  TongkiStep01,
  BunnyStep02,
  BunnyStep01,
} from '../assets/character'

export function SetCharacter(hero, percent) {
  if (hero === 'bunny') {
    if (percent < 30) {
      return BunnyStep01
    }
    if (percent < 60) {
      return BunnyStep02
    }
    return BunnyStep03
  }

  if (hero === 'tongki') {
    if (percent < 30) {
      return TongkiStep01
    }
    if (percent < 60) {
      return TongkiStep02
    }
    return TongkiStep03
  }

  if (hero === 'tongki') {
    if (percent < 30) {
      return TongkiStep01
    }
    if (percent < 60) {
      return TongkiStep02
    }
    return TongkiStep03
  }
}

export function SetCharacterFace(hero) {
  if (hero === 'bunny') {
    return BunnyFace
  }

  if (hero === 'tanni') {
    return TanniFace
  }

  if (hero === 'tongki') {
    return TongkiFace
  }
}
