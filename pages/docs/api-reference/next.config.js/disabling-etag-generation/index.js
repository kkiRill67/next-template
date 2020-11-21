import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Отключение генерации ETag</h1>
            
Next.js по умолчанию будет генерировать etags для каждой страницы. Вы можете отключить генерацию etag для HTML-страниц в зависимости от вашей стратегии кеширования.

<p>Откройте next.config.js и отключите generateEtags опцию:</p>


<Highlight language="javascript">
{`module.exports = {
  generateEtags: false,
}`}
</Highlight>

            </div>
        </Docs>
    )
}