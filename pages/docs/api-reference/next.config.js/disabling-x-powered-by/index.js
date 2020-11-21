import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Отключение x-powered-by</h1>
            
По умолчанию Next.js добавит x-powered-by заголовок. Чтобы отказаться от этого, откройте next.config.js и отключите poweredByHeader конфигурацию:

<Highlight language="javascript">
{`module.exports = {
  poweredByHeader: false,
}`}
</Highlight>


            </div>
        </Docs>
    )
}