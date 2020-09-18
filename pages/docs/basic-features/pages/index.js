import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
            <h1>Страницы</h1>
<div className='note'>Этот документ предназначен для Next.js версий 9.3 и выше. Если вы используете более старые версии Next.js, обратитесь к предыдущей документации.</div>
<p>В Next.js, страница является Реагировать компонент экспортирован из <span class="spanTag">.js</span>, <span class="spanTag">.jsx</span>, <span class="spanTag">.ts</span> или <span class="spanTag">.tsx</span> файла в <span class="spanTag">pages</span> каталоге. Каждая страница связана с маршрутом на основе имени файла.</p>


<strong>Пример:</strong> если вы создадите, <span class="spanTag">pages/about.js</span> который экспортирует компонент React, как показано ниже, он будет доступен по адресу <span class="spanTag">/about</span>.

<Highlight language="javascript">{`function About() {
    return <div>About</div>
  }
  export default About`}</Highlight>
    


<h3>Страницы с динамическими маршрутами</h3>
<p>Next.js поддерживает страницы с динамическими маршрутами. Например, если вы создадите файл с именем <span class="spanTag">pages/posts/[id].js</span>, он будет доступен по адресу <span class="spanTag">posts/1</span>, <span class="spanTag">posts/2</span> и т.д.</p>

<div className='note'>Чтобы узнать больше о динамической маршрутизации, обратитесь к документации по динамической маршрутизации .</div>

<h2>Предварительный рендеринг</h2>
<p>По умолчанию Next.js выполняет <strong>предварительный рендеринг</strong> каждой страницы. Это означает, что Next.js заранее генерирует HTML для каждой страницы, вместо того, чтобы делать все это с помощью клиентского JavaScript. Предварительный рендеринг может улучшить производительность и улучшить SEO.</p>
<p>Каждый сгенерированный HTML связан с минимальным кодом JavaScript, необходимым для этой страницы. Когда страница загружается браузером, выполняется ее код JavaScript, который делает страницу полностью интерактивной. (Этот процесс называется гидратацией .)</p>

<h3>Две формы предварительного рендеринга</h3>
<p>Next.js имеет две формы предварительного рендеринга: статическая генерация и рендеринг на стороне сервера. Разница в том, когда он генерирует HTML для страницы.</p>

<p className='list'>
    - <strong>Статическая генерация (рекомендуется)</strong> : HTML-код создается во время сборки и будет повторно использоваться при каждом запросе.
</p>
<p className='list'>
    - <strong>Рендеринг на стороне сервера</strong> : HTML создается для каждого запроса.
</p>

<p>
Важно отметить, что Next.js позволяет вам выбрать, какую форму предварительного рендеринга вы хотите использовать для каждой страницы. Вы можете создать «гибридное» приложение Next.js, используя статическую генерацию для большинства страниц и используя рендеринг на стороне сервера для других.
</p>

<p>
Мы рекомендуем использовать статическую генерацию вместо рендеринга на стороне сервера из соображений производительности. Статически сгенерированные страницы могут кэшироваться CDN без дополнительной настройки для повышения производительности. Однако в некоторых случаях рендеринг на стороне сервера может быть единственным вариантом.
</p>

<p>Вы также можете использовать рендеринг на стороне клиента вместе со статической генерацией или рендерингом на стороне сервера. Это означает, что некоторые части страницы могут быть полностью обработаны клиентским JavaScript. Чтобы узнать больше, ознакомьтесь с документацией по извлечению данных .</p>

<h2>Статическая генерация (рекомендуется)</h2>
<p>Если страница использует статическое создание, HTML-код страницы создается во время сборки. Это означает, что в производственной среде HTML страницы создаются при запуске <span class="spanTag">next build</span>. Затем этот HTML-код будет повторно использоваться для каждого запроса. Его можно кэшировать с помощью CDN.</p>
<p>В Next.js вы можете статически создавать страницы с данными или без них. Давайте рассмотрим каждый случай.</p>

<h3>Статическая генерация без данных</h3>
<p>По умолчанию Next.js выполняет предварительную отрисовку страниц с использованием статической генерации без извлечения данных. Вот пример:</p>

<Highlight language="javascript">
  {`function About() {
    return <div>About</div>
  }
  export default About`}
  </Highlight>

<p>Обратите внимание, что этой странице не требуется получать какие-либо внешние данные для предварительной обработки. В подобных случаях Next.js генерирует один HTML-файл для каждой страницы во время сборки.</p>

<h3>Статическая генерация с данными</h3>

<p>Некоторые страницы требуют получения внешних данных для предварительного рендеринга. Есть два сценария, и один или оба могут применяться. В любом случае вы можете использовать специальную функцию, которую Next.js предоставляет:</p>

<p className='list'>
    1. Содержание вашей страницы зависит от внешних данных: Используйте <span class="spanTag">getStaticProps</span>.
</p>
<p className='list'>
    2. Пути к вашим страницам зависят от внешних данных: Используйте <span class="spanTag">getStaticPaths</span>(обычно в дополнение к <span class="spanTag">getStaticProps</span>).
</p>

<h4>Сценарий 1. Содержание вашей страницы зависит от внешних данных</h4>
<strong>Пример.</strong> На странице вашего блога может потребоваться получить список сообщений блога из CMS (системы управления контентом).

<Highlight language="javascript">
  {` // TODO: Need to fetch 'posts' (by calling some API endpoint)
// before this page can be pre-rendered.
function Blog({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li>{post.title}</li>
        ))}
      </ul>
    )
  }
  export default Blog`}
</Highlight>


Чтобы извлечь эти данные надо предварительно вынести, Next.js позволяет <span class="spanTag">export</span> в <span class="spanTag">async</span> функции, вызываемой <span class="spanTag">getStaticProps</span> из того же файла. Эта функция вызывается во время сборки и позволяет передавать полученные данные на страницу <span class="spanTag">props</span> при предварительном рендеринге.


<Highlight language="javascript">
{`function Blog({ posts }) {
// Render posts...
}

// This function gets called at build time


      export async function getStaticProps() {
       // Call an external API endpoint to get posts
    const res = await fetch('https://.../posts')
    const posts = await res.json()
  // By returning {' props: posts '}, the Blog component
  // will receive 'posts' as a prop at build time
  return {
      props: {
        posts,
      },
    }
  }
  
  export default Blog`}
</Highlight>


<p>Чтобы узнать больше о том <span class="spanTag">getStaticProps</span>, как работает, ознакомьтесь с документацией по извлечению данных.</p>
<h4>Сценарий 2. Пути к страницам зависят от внешних данных</h4>
<p>Next.js позволяет создавать страницы с динамическими маршрутами. Например, вы можете создать файл с именем <span class="spanTag">pages/posts/[id].js</span> для отображения отдельного сообщения в блоге на основе <span class="spanTag">id</span>. Это позволит вам показывать сообщение в блоге, <span class="spanTag">id: 1</span> когда вы входите в него <span class="spanTag">posts/1</span>.</p>

<div className='note'>Чтобы узнать больше о динамической маршрутизации, обратитесь к документации по динамической маршрутизации.</div>
<p>Однако то, что <span class="spanTag">id</span> вы хотите предварительно отрисовать во время сборки, может зависеть от внешних данных.</p>
<p><strong>Пример:</strong> предположим, что вы добавили <span class="spanTag">id: 1</span> в базу данных только одно сообщение в блоге. В этом случае вам нужно выполнить предварительный рендеринг только <span class="spanTag">posts/1</span> во время сборки.</p>
<p>Позже вы можете добавить второй пост с расширением <span class="spanTag">id: 2</span>. Тогда вы также захотите выполнить предварительный рендеринг <span class="spanTag">posts/2</span>.</p>
<p>Таким образом, ваши пути к страницам, которые предварительно отображаются, зависят от внешних данных. Чтобы справиться с этим, Next.js позволяет вам <span class="spanTag">export</span> в <span class="spanTag">async</span> функцию с именем <span class="spanTag">getStaticPaths</span> из динамической страницы (<span class="spanTag">pages/posts/[id].js</span> в данном случае). Эта функция вызывается во время сборки и позволяет указать, какие пути вы хотите предварительно визуализировать.</p>

<Highlight language="javascript">
  {`
// This function gets called at build time
         export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://.../posts')
    const posts = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => '/posts/\${post.id}')
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }`}
</Highlight>


Кроме того <span class="spanTag">pages/posts/[id].js</span>, вам нужно экспортировать, <span class="spanTag">getStaticProps</span> чтобы вы могли получить данные о публикации с этим <span class="spanTag">id</span> и использовать их для предварительного рендеринга страницы:

<Highlight language="javascript">
{`function Post({ post }) {
    // Render post...
  }
  
  export async function getStaticPaths() {
    // ...
  }
  
  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the post 'id'.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch('https://.../posts/\${params.id}')
    const post = await res.json()
  
    // Pass post data to the page via props
    return { props: { post } }
  }
  
  export default Post`}
</Highlight>


<p>Чтобы узнать больше о том <span class="spanTag">getStaticPaths</span>, как работает, ознакомьтесь с документацией по извлечению данных.</p>

<h2>Когда мне следует использовать статическую генерацию?</h2>
<p>Мы рекомендуем использовать статическую генерацию (с данными и без них), когда это возможно, потому что ваша страница может быть создана один раз и обслужена CDN, что делает ее намного быстрее, чем сервер, отображающий страницу при каждом запросе.</p>
<p>Вы можете использовать статическую генерацию для многих типов страниц, включая:</p>

<p className='list'>- Маркетинговые страницы</p>
<p className='list'>- Сообщения в блоге</p>
<p className='list'>- Списки товаров для электронной коммерции</p>
<p className='list'>- Помощь и документация</p>

<p>Вы должны спросить себя: «Могу ли я предварительно обработать эту страницу до запроса пользователя?» Если да, то вам следует выбрать «Статическая генерация».</p>
<p>С другой стороны, статическая генерация не является хорошей идеей, если вы не можете предварительно отрисовать страницу до запроса пользователя. Возможно, ваша страница показывает часто обновляемые данные, и содержание страницы меняется при каждом запросе.</p>
<p>В подобных случаях вы можете сделать одно из следующего:</p>

<p className='list'>- Использование статической генерации с рендерингом на стороне клиента: вы можете пропустить предварительный рендеринг некоторых частей страницы, а затем использовать клиентский JavaScript для их заполнения. Чтобы узнать больше об этом подходе, ознакомьтесь с документацией по извлечению данных .
</p>
<p className='list'>- Использовать рендеринг на стороне сервера: Next.js выполняет предварительный рендеринг страницы при каждом запросе. Это будет медленнее, потому что страница не может быть кэширована CDN, но предварительно обработанная страница всегда будет актуальной. Об этом подходе мы поговорим ниже.
</p>

<h2>Рендеринг на стороне сервера</h2>

<div className='note'>Также называется «SSR» или «Динамический рендеринг».</div>
<p>Если страница использует рендеринг на стороне сервера, HTML страницы создается при каждом запросе.</p>
<p>Для использования на стороне сервера Rendering для страницы, необходимо <span class="spanTag">export</span> в <span class="spanTag">async</span> функции , вызываемой <span class="spanTag">getServerSideProps</span>. Эта функция будет вызываться сервером при каждом запросе.</p>
<p>Например, предположим, что ваша страница должна предварительно отображать часто обновляемые данные (полученные из внешнего API). Вы можете написать, <span class="spanTag">getServerSideProps</span> который извлекает эти данные и передает их, <span class="spanTag">Page</span> как показано ниже:</p>


<Highlight language="javascript">
  {`  function Page({ data }) {   // Render data...
  }
  
  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://.../data')
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Page`}
</Highlight>
  

<p>Как видите, <span class="spanTag">getServerSideProps</span> похож на <span class="spanTag">getStaticProps</span>, но с той разницей, что <span class="spanTag">getServerSideProps</span> запускается при каждом запросе, а не во время сборки.</p>
<p>Чтобы узнать больше о том, как работает <span class="spanTag">getServerSideProps</span>, ознакомьтесь с документацией по извлечению данных.</p>

<h2>Резюме</h2>
<p>Мы обсудили две формы предварительного рендеринга для Next.js.</p>
<p className="list"> - <strong>Статическая генерация (рекомендуется):</strong> HTML-код создается во время сборки и будет повторно использоваться при каждом запросе. Чтобы страница использовала статическое создание, либо экспортируйте компонент страницы, либо экспортируйте <span class="spanTag">getStaticProps</span>(и <span class="spanTag">getStaticPaths</span> при необходимости). Это отлично подходит для страниц, которые могут быть предварительно обработаны до запроса пользователя. Вы также можете использовать его с рендерингом на стороне клиента для ввода дополнительных данных.
</p>
<p className="list"> - <strong>Рендеринг на стороне сервера:</strong> HTML создается для каждого запроса. Чтобы страница использовала рендеринг на стороне сервера, выполните экспорт <span class="spanTag">getServerSideProps</span>. Поскольку рендеринг на стороне сервера приводит к снижению производительности, чем статическое создание, используйте его только в случае крайней необходимости.
</p>


            </div>
        </Docs>
        
    )
}