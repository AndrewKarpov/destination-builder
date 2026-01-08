import { Button } from "@/ui"

function App() {

  return (
    <>
      <div>
        <Button variant={Button.Variants.Secondary}>Cancel</Button>
        <Button>Save</Button>
        <Button disabled>Save</Button>
      </div>
      <div style={{ display: 'flex', width: '550px', gap: '10px' }}>
        <Button variant={Button.Variants.Tertiary}>AWS</Button>
        <Button variant={Button.Variants.Tertiary}>Google Cloud</Button>
      </div>
    </>
  )
}

export default App
