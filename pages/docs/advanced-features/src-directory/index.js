import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Каталог src</h1>
            
<p>
Страницы также могут быть добавлены <span className="spanTag">src/pages</span> в качестве альтернативы корневому <span className="spanTag">pages</span> каталогу.
</p>

<p>
Каталог <span className="spanTag">src</span> является очень распространенным явлением во многих приложениях и Next.js поддерживает его по умолчанию.
</p>

<h2>Предостережения</h2>

<p> - <span className="spanTag">src/pages</span> будет проигнорирован, если <span className="spanTag">pages</span> присутствует в корневом каталоге</p>
<p>
 - Файлы конфигурации, такие как <span className="spanTag">next.config.js</span> и, <span className="spanTag">tsconfig.json</span> должны находиться внутри корневого каталога, их перемещение <span className="spanTag">src</span> не сработает. То же самое и с <span className="spanTag">public</span> каталогом
</p>
            </div>
        </Docs>
    )
}