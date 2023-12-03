import { useRef, useState } from 'react'
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

marked.use({
  gfm: true,
})

function App() {
  const [serverData, setServerData] = useState([{}])
  const [userPrompt, setUserPrompt] = useState('')

  const inputRef = useRef(null)

  function handleSubmit() {
    fetch("/api", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'prompt': userPrompt })
    })
      .then((res) => res.json())
      .then((data) => {
        const html = DOMPurify.sanitize(marked(data))
        console.log(data)
        setServerData({ ...data, html })
        inputRef.current.focus()

        setUserPrompt('')
      }
      )
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      inputRef.current.blur()
      handleSubmit()
    }
  }


  return (
    <main style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ padding: '10px', marginBottom: '0' }}>My Prompter App</h1>
      <div style={{ margin: '0', flexGrow: '1' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <article style={{ margin: '0' }} dangerouslySetInnerHTML={{ __html: serverData.html }} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'end', backgroundColor: '#222', padding: '10px' }}>
        <textarea style={{ margin: '0', flexGrow: '1', overflow: 'hidden' }} onChange={(e) => setUserPrompt(e.target.value)} placeholder='Type in Prompt' onKeyDown={handleKeyDown} ref={inputRef} value={userPrompt} />
        <button style={{ margin: '0', flex: '1', paddingLeft: '10px' }} onClick={handleSubmit}>Go</button>
      </div>
    </main>
  )
}

export default App
