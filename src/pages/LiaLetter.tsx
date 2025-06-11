import { Letter } from './love-letter/Letter'
import { ProtectedAccess } from './love-letter/ProtectAccess'

export function LiaLetter() {
  return (
    <ProtectedAccess>
      <Letter />
    </ProtectedAccess>
  )
}
