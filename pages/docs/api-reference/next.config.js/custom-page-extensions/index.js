import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Пользовательские расширения страниц</h1>

Направлен на такие модули, как @next/mdx, который добавляет поддержку страниц, заканчивающихся на .mdx. Вы можете настроить расширения, которые ищутся в pages каталоге при разрешении страниц.

<p>Открываем next.config.js и добавляем pageExtensions конфиг:</p>


<Highlight language="javascript">
{`module.exports = {
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
}`}
</Highlight>

            </div>
        </Docs>
    )
}