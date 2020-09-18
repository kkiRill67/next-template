import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>src Каталог</h1>
            
<p>
Страницы также могут быть добавлены src/pagesв качестве альтернативы корневому pages каталогу.
</p>

<p>
src Каталог является очень распространенным явлением во многих приложениях и Next.js поддерживает его по умолчанию.
</p>

<h2>Предостережения</h2>

<p> - src/pages будет проигнорирован, если pagesприсутствует в корневом каталоге</p>
<p>
 - Файлы конфигурации, такие как next.config.js и, tsconfig.json должны находиться внутри корневого каталога, их перемещение src не сработает. То же самое и с public каталогом
</p>
            </div>
        </Docs>
    )
}