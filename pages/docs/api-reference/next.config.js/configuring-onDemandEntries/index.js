import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Настройка onDemandEntries</h1>
            
Next.js предоставляет некоторые параметры, которые дают вам некоторый контроль над тем, как сервер будет размещать или хранить в памяти встроенные страницы в процессе разработки.
<p>Чтобы изменить настройки по умолчанию, откройте next.config.js и добавьте onDemandEntries конфигурацию:</p>

<Highlight language="javascript">
{`module.exports = {
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}`}
</Highlight>


            </div>
        </Docs>
    )
}