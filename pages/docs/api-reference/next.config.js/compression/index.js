import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Сжатие</h1>
            
Next.js обеспечивает сжатие gzip для сжатия визуализированного содержимого и статических файлов. Сжатие работает только с server target. В общем, вы захотите включить сжатие на HTTP-прокси, таком как nginx, чтобы разгрузить Node.js процесс.

<p>Чтобы отключить сжатие, откройте next.config.js и отключите <span className="spanTag">compress</span> конфиг:</p>

<Highlight language="javascript">
{`module.exports = {
  compress: false,
}`}
</Highlight>


            </div>
        </Docs>
    )
}