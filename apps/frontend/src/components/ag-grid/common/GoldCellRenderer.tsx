const GoldCellRenderer = (props: { value: number }) => {
  const value = props.value

  return (
    <span style={{ color: value > 3 ? 'Blue' : 'inherit' }}>
      {value}
    </span>
  )
}

export default GoldCellRenderer