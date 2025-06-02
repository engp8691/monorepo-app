enum MedalType {
  GOLD = 'gold',
  SILVER = 'silver',
  BRONZE = 'bronze'
}
interface MedalCellRendererProps {
  value: number
  type: MedalType
}

const icons = {
  gold: '🏅',
  silver: '🥈',
  bronze: '🥉',
}

const MedalCellRenderer: React.FC<MedalCellRendererProps> = ({ value = 0, type }) => {
  return <span>{value || ''} {value && icons[type].repeat(value)}</span>
}

export const GoldMedalCellRenderer = ({ value = 0 }) => {
  return <MedalCellRenderer value={value} type={MedalType.GOLD} />
}

export const SilverMedalCellRenderer = ({ value = 0 }) => {
  return <MedalCellRenderer value={value} type={MedalType.SILVER} />
}

export const BronzeMedalCellRenderer = ({ value = 0 }) => {
  return <MedalCellRenderer value={value} type={MedalType.BRONZE} />
}