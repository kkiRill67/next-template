import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Автоматическая статическая оптимизация</h1>
            
<p>
Next.js автоматически определяет, что страница является статической (может быть предварительно обработана), если она не имеет требований к блокирующим данным. Это определение производится по отсутствию <span className="spanTag">getServerSideProps</span> и <span className="spanTag">getInitialProps</span> на странице.
</p>
Эта функция позволяет Next.js создавать гибридные приложения, содержащие как страницы, отрисованные на сервере, так и статически сгенерированные.
<div className="note">
Статически сгенерированные страницы по-прежнему являются реактивными: Next.js будет гидратировать ваше приложение на стороне клиента, чтобы дать ему полную интерактивность.
</div>

Одним из основных преимуществ этой функции является то, что оптимизированные страницы не требуют вычислений на стороне сервера и могут быть мгновенно переданы конечному пользователю из нескольких расположений CDN. Результат - сверхбыстрая загрузка для ваших пользователей.

<h2>Как это устроено</h2>

Если <span className="spanTag">getServerSideProps</span> или <span className="spanTag">getInitialProps</span> присутствует на странице, Next.js переключится на рендеринг страницы по запросу, по запросу (то есть рендеринг на стороне сервера).
<p>
Если это не так, Next.js автоматически оптимизирует вашу страницу статически, предварительно преобразовав ее в статический HTML.
</p>

<p>
Во время предварительной визуализации <span className="spanTag">query</span> объект маршрутизатора будет пустым, так как у нас нет <span className="spanTag">query</span> информации, которую нужно предоставить на этом этапе. После гидратации Next.js запустит обновление вашего приложения, чтобы предоставить параметры маршрута в <span className="spanTag">query</span> объекте.
</p>

<div className="note">
Примечание. Параметры, добавленные с помощью динамических маршрутов на страницу, которая используется <span className="spanTag">getStaticProps</span>, всегда будут доступны внутри <span className="spanTag">query</span> объекта.
</div>

<span className="spanTag">next build</span> выдаст <span className="spanTag">.html</span> файлы для статически оптимизированных страниц. Например, результат для страницы <span className="spanTag">pages/about.js</span> будет:

<Highlight language="node">
{`.next/server/static/\${BUILD_ID}/about.html`}
</Highlight>

И если вы добавите <span className="spanTag">getServerSideProps</span> на страницу, тогда это будет JavaScript, например:

<Highlight language="node">
{`.next/server/static/\${BUILD_ID}/about.js`}
</Highlight>
    
В процессе разработки вы узнаете, <span className="spanTag">pages/about.js</span> оптимизирован он или нет, благодаря включенному индикатору статической оптимизации.

<h2>Предостережения</h2>

<p className="list">
 - Если у вас есть обычный <span className="spanTag">App</span> с <span className="spanTag">getInitialProps</span>, то эта оптимизация будет отключена на страницах без статического поколения.
</p>
<p className="list">
 - Если у вас есть обычный <span className="spanTag">Document</span> с <span className="spanTag">getInitialProps</span> убедитесь, что вы проверить, если <span className="spanTag">ctx.req</span> определяется, прежде чем приступить страницы на стороне сервера визуализации. <span className="spanTag">ctx.req</span> будет <span className="spanTag">undefined</span> для страниц с предварительной визуализацией.
</p>
            </div>
        </Docs>
    )
}