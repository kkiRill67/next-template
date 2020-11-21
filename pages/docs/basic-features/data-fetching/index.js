import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className='container'>
            <h1>Получение данных</h1>

            <div className='note'>Этот документ предназначен для Next.js версий 9.3 и выше. Если вы используете более старые версии Next.js, обратитесь к нашей предыдущей документации .</div>

<p>В разделе 'Страницы' мы объяснили, что Next.js имеет две формы предварительного рендеринга: статическая генерация и рендеринг на стороне сервера. На этой странице мы подробно поговорим о стратегиях выборки данных для каждого случая. Мы рекомендуем вам сначала прочитать раздел 'Страницы', если вы еще этого не сделали.</p>
<p>Мы поговорим о трех уникальных функциях Next.js, которые вы можете использовать для получения данных для предварительного рендеринга:</p>
<p className='list'> - <span className="spanTag">getStaticProps</span>(Статическая генерация): получение данных во время сборки.</p>
<p className='list'> - <span className="spanTag">getStaticPaths</span>(Статическая генерация): укажите динамические маршруты для предварительной визуализации на основе данных.</p>
<p className='list'> - <span className="spanTag">getServerSideProps</span>(Отрисовка на стороне сервера): получение данных по каждому запросу.</p>
<p>Кроме того, мы кратко поговорим о том, как получать данные на стороне клиента.</p>

<h2><span className="spanTag">getStaticProps</span> (Статическая генерация)</h2>
<p>Если вы экспортируете <span className="spanTag">async</span> функцию, вызываемую <span className="spanTag">getStaticProps</span> со страницы, Next.js предварительно отобразит эту страницу во время сборки, используя реквизиты, возвращаемые <span className="spanTag">getStaticProps</span>.</p>

<Highlight language="javascript">
        {`export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}`}
</Highlight>

<p><span className="spanTag"><strong>context</strong></span> Параметр представляет собой объект, содержащий следующие ключи:</p>
<p className="list"> - <span className="spanTag">params</span> содержит параметры маршрута для страниц, использующих динамические маршруты. Например, если имя страницы <span className="spanTag">[id].js</span>, то <span className="spanTag">params</span> будет выглядеть так <span className="spanTag">{` id: ... `}</span>. Чтобы узнать больше, ознакомьтесь с документацией по динамической маршрутизации. Вы должны использовать это вместе с <span className="spanTag">getStaticPaths</span>, что мы объясним позже.</p>
<p className="list"> - <span className="spanTag">preview</span> это <span className="spanTag">true</span> если страница находится в режиме предварительного просмотра и в <span className="spanTag">undefined</span> противном случае. См. Документацию по режиму предварительного просмотра.</p>
<p className="list"> - <span className="spanTag">previewData</span> содержит данные предварительного просмотра, установленные пользователем <span className="spanTag">setPreviewData</span>. См. Документацию по режиму предварительного просмотра.</p>

<p><span className="spanTag"><strong>getStaticProps</strong></span> должен вернуть объект с:</p>

<p className="list"> - <span className="spanTag">props</span> - это требуется объект с реквизитом , которые будут получены с помощью компонента страницы. Это должен быть сериализуемый объект</p>
<p className="list"> - <span className="spanTag">revalidate</span> - Необязательное количество секунд, после которого может произойти повторное создание страницы. Подробнее об инкрементальной статической регенерации</p>

<div className="note">
<strong>Примечание:</strong> вы можете импортировать модули в области верхнего уровня для использования в <span className="spanTag">getStaticProps</span>. Импорты, используемые в <span className="spanTag">getStaticProps</span>, не будут объединены для клиентской стороны.
<p>Это означает, что вы можете писать код на стороне сервера прямо в <span className="spanTag">getStaticProps</span>. Это включает чтение из файловой системы или базы данных.</p>
</div>
<div className="note">
<strong>Примечание:</strong> вы не должны использовать <span className="spanRed">fetch()</span> для вызова маршрута API в вашем приложении. Вместо этого напрямую импортируйте маршрут API и вызывайте его функцию самостоятельно. Для этого подхода вам может потребоваться небольшой рефакторинг вашего кода.
<p>Получение из внешнего API - это нормально!</p>
</div>

<h3>Простой пример</h3>
<p>Вот пример, который используется <span className="spanTag">getStaticProps</span> для получения списка сообщений в блоге из CMS (системы управления контентом). Этот пример также есть в документации Pages.</p>

<Highlight language="javascript">
        {`// posts will be populated at build time by getStaticProps()
        function Blog({ posts }) {
          return (
            <ul>
              {posts.map((post) => (
                <li>{post.title}</li>
              ))}
            </ul>
          )
        }
        
        // This function gets called at build time on server-side.
        // It won't be called on client-side, so you can even do
        // direct database queries. See the "Technical details" section.
        export async function getStaticProps() {
          // Call an external API endpoint to get posts.
          // You can use any data fetching library
          const res = await fetch('https://.../posts')
          const posts = await res.json()
        
          // By returning { props: posts }, the Blog component
          // will receive 'posts' as a prop at build time
          return {
            props: {
              posts,
            },
          }
        }
        
        export default Blog`}
        </Highlight>
    


<h3>Когда я должен использовать <span className="spanTag">getStaticProps</span>?</h3>

Вам следует использовать, <span className="spanTag">getStaticProps</span> если:

<p className='list'>
 - Данные, необходимые для визуализации страницы, доступны во время сборки до запроса пользователя.
</p>
<p className='list'>
 - Данные поступают из автономной CMS.
</p>
<p className='list'>
 - Данные могут быть публично кэшированы (не специфичны для пользователя).
</p>
<p className='list'>
 - Страница должна быть предварительно обработана (для SEO) и быть очень быстрой - <span className="spanTag">getStaticProps</span> генерировать файлы HTML и JSON, которые для повышения производительности могут быть кэшированы CDN.
</p>

<h3>TypeScript: использовать <span className="spanTag">GetStaticProps</span></h3>

Для TypeScript вы можете использовать <span className="spanTag">GetStaticProps</span> тип из next:

<Highlight language="javascript">
        {`import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
}`}

</Highlight>


Если вы хотите получить предполагаемую типизацию для своих реквизитов, вы можете использовать <span className="spanTag">InferGetStaticPropsType{`<typeof getStaticProps>`}</span>, например:


<Highlight language="javascript">{`import { InferGetStaticPropsType } from 'next'

type Post = {
  author: string
  content: string
}

export const getStaticProps = async () => {
  const res = await fetch('https://.../posts')
  const posts: Post[] = await res.json()

  return {
    props: {
      posts,
    },
  }
}

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  // will resolve posts to type Post[]
}

export default Blog`}</Highlight>
  

<h3>Постепенная статическая регенерация</h3>
<div className="note">
Эта функция была представлена ​​в Next.js 9.5 и новее. Если вы используете более старые версии Next.js, обновите его, прежде чем пробовать инкрементную статическую регенерацию.
</div>

<p>
С <span className="spanTag">getStaticProps</span> вами не должны прекратить полагаться на динамическое содержимое, так как статический контент также может быть динамическим . Постепенная статическая регенерация позволяет обновлять существующие страницы, повторно отображая их в фоновом режиме по мере поступления трафика.
</p>
<p>
Фоновая регенерация, вдохновленная устаревшей при повторной валидации , обеспечивает бесперебойное обслуживание трафика, всегда из статического хранилища, а вновь созданная страница отправляется только после завершения генерации.
</p>

<p>
Рассмотрим наш предыдущий <span className="spanTag">getStaticProps</span> пример , но теперь с включенной регенерацией:
</p>

<Highlight language="javascript">{`function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}

export default Blog`}
</Highlight>


<p>
Теперь список сообщений в блоге будет обновляться раз в секунду; если вы добавите новую запись в блог, она будет доступна почти сразу, без необходимости перестраивать приложение или выполнять новое развертывание.
</p>

<p>
Это отлично работает с <span className="spanTag">fallback: true</span>. Потому что теперь у вас может быть список сообщений, который всегда обновляется с последними сообщениями, и иметь страницу сообщений в блоге, которая генерирует сообщения в блоге по запросу, независимо от того, сколько сообщений вы добавляете или обновляете.
</p>

<h4>Статический контент в масштабе</h4>

<p>
В отличие от традиционного SSR, добавочная статическая регенерация гарантирует, что вы сохраните преимущества статики:
</p>

<p className='list'>
 - Никаких всплесков задержки. Страницы обслуживаются стабильно быстро
</p>
<p className='list'>
 - Страницы никогда не отключаются. Если повторное создание фоновой страницы не удается, старая страница остается неизменной.
</p>
<p className='list'>
 - Низкая нагрузка на базу данных и серверную часть. Страницы пересчитываются не более одного раза одновременно
</p>


<h3>Чтение файлов: Используйте <span className="spanTag">process.cwd()</span></h3>
<p>
Файлы можно читать прямо из файловой системы в <span className="spanTag">getStaticProps</span>.
</p>
<p>
Для этого вам необходимо получить полный путь к файлу.
</p>
<p>
Поскольку Next.js компилирует ваш код в отдельный каталог, вы не можете использовать его, так <span className="spanTag">__dirname</span> как путь, который он вернет, будет отличаться от каталога страниц.
</p>
<p>
Вместо этого вы можете использовать, <span className="spanTag">process.cwd()</span> который дает вам каталог, в котором выполняется Next.js.
</p>


<Highlight language="javascript">
 {`import fs from 'fs'
import path from 'path'

// posts will be populated at build time by getStaticProps()
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>
          <h3>{post.filename}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return {
      filename,
      content: fileContents,
    }
  })
  // By returning { props: posts }, the Blog component
  // will receive 'posts' as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog`}
</Highlight>
       


<h3>Технические подробности</h3>
<h4>Работает только во время сборки</h4>
<p>
Поскольку он <span className="spanTag">getStaticProps</span> выполняется во время сборки, он не получает данные, доступные только во время запроса, такие как параметры запроса или заголовки HTTP, поскольку он генерирует статический HTML.
</p>
<h4>Напишите код на стороне сервера напрямую</h4>
<p>
Обратите внимание, что <span className="spanTag">getStaticProps</span> работает только на стороне сервера. Он никогда не будет запущен на стороне клиента. Он даже не будет включен в пакет JS для браузера. Это означает, что вы можете писать код, например, прямые запросы к базе данных, не отправляя их в браузеры. Вы не должны извлекать маршрут API из <span className="spanTag">getStaticProps</span> - вместо этого вы можете написать код на стороне сервера непосредственно в getStaticProps.
</p>
<p>
Вы можете использовать этот инструмент, чтобы проверить, что Next.js исключает из клиентского пакета.
</p>

<h4>
Статически генерирует как HTML, так и JSON
</h4>
<p>
Когда страница с <span className="spanTag">getStaticProps</span> предварительно визуализируется во время сборки, в дополнение к файлу HTML страницы Next.js генерирует файл JSON, содержащий результат выполнения <span className="spanTag">getStaticProps</span>.
</p>
<p>
Этот файл JSON будет использоваться при маршрутизации на стороне клиента через <span className="spanTag">next/link</span>( документацию ) или <span className="spanTag">next/router</span>( документацию ). Когда вы переходите на страницу, предварительно отрисованную с использованием <span className="spanTag">getStaticProps</span>, Next.js извлекает этот файл JSON (предварительно вычисленный во время сборки) и использует его в качестве свойств для компонента страницы. Это означает , что переходы на стороне клиента страница будет не называть, <span className="spanTag">getStaticProps</span> как используется только на экспорт в формате JSON.
</p>


<h4>Разрешено только на странице</h4>
<p>
<span className="spanTag">getStaticProps</span> можно экспортировать только со страницы. Вы не можете экспортировать его из файлов, не являющихся страницами.
</p>
<p>
Одна из причин этого ограничения заключается в том, что React должен иметь все необходимые данные перед отображением страницы.
</p>
<p>
Также вы должны использовать <span className="spanTag">export async function getStaticProps() {}</span>- он не будет работать, если вы добавите <span className="spanTag">getStaticProps</span> как свойство компонента страницы.
</p>

<h4>
Работает по каждому запросу в разработке
</h4>
<p>
В development (<span className="spanTag">next dev</span>) <span className="spanTag">getStaticProps</span> будет вызываться по каждому запросу.
</p>

<h4>Режим предварительного просмотра</h4>
<p>
В некоторых случаях вы можете временно обойти статическую генерацию и отобразить страницу во время запроса, а не во время сборки. Например, вы можете использовать автономную CMS и хотите предварительно просмотреть черновики перед их публикацией.
</p>
<p>
Этот вариант использования поддерживается Next.js функцией Preview Mode. Дополнительные сведения см. В документации по режиму предварительного просмотра.
</p>

<h2><span className="spanTag">getStaticPaths</span> (Статическая генерация)</h2>
<p>
Если страница имеет динамические маршруты ( документация ) и использует <span className="spanTag">getStaticProps</span> ее, необходимо определить список путей, которые должны отображаться в HTML во время сборки.
</p>
<p>
Если вы экспортируете <span className="spanTag">async</span> функцию, вызываемую <span className="spanTag">getStaticPaths</span> со страницы, которая использует динамические маршруты, Next.js будет статически предварительно визуализировать все пути, указанные в <span className="spanTag">getStaticPaths</span>.
</p>

<Highlight language="javascript">
  {`export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } } // See the "paths" section below
    ],
    fallback: true or false // See the "fallback" section below
  };
}`}
</Highlight>



<h4><span className="spanTag">paths</span> Ключ (обязательно)</h4>

В <span className="spanTag">paths</span> ключе определяет, какие пути будут предварительно оказаны. Например, предположим, что у вас есть страница, использующая динамические маршруты с именем <span className="spanTag">pages/posts/[id].js</span>. Если вы экспортируете <span className="spanTag">getStaticPaths</span> с этой страницы и вернете следующее для <span className="spanTag">paths</span>:


<Highlight language="javascript">
  {`return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
  fallback: ...
}`}
</Highlight>

<p>
Затем Next.js будет статически сгенерирован <span className="spanTag">posts/1</span> и <span className="spanTag">posts/2</span> во время сборки с использованием компонента страницы в <span className="spanTag">pages/posts/[id].js</span>.
</p>
<p>
Обратите внимание, что значение для каждого paramsдолжно соответствовать параметрам, используемым в имени страницы:
</p>

<p className='list'>
 - Если имя страницы есть <span className="spanTag">pages/posts/[postId]/[commentId]</span>, то paramsдолжно содержать postId и commentId.
</p>
<p className='list'>
 - Если в названии страницы используются маршруты для приема всей почты домена, например pages/[...slug], тогда <span className="spanTag">params</span> должно быть указано <span className="spanTag">slug</span>, что является массивом. Например, если это массив <span className="spanTag">['foo', 'bar']</span>, Next.js статически сгенерирует страницу по адресу <span className="spanTag">/foo/bar</span>.
</p>
<p className='list'>
 - Если страница использует дополнительный кетчуп весь маршрут, поставки <span className="spanTag">null, [], undefined</span> или <span className="spanTag">false</span> чтобы сделать корневой наиболее маршрут. Например, если вы предоставите <span className="spanTag">slug: false</span> для <span className="spanTag">pages/[[...slug]]</span>, Next.js статически сгенерирует страницу <span className="spanTag">/</span>.
</p>

<h4> <span className="spanTag">fallback</span> Ключ (обязательно)</h4>
Возвращаемый объект <span className="spanTag">getStaticPaths</span> должен содержать логический <span className="spanTag">fallback</span> ключ.

<h4> <span className="spanTag">fallback: false</span></h4>
<p>
Если <span className="spanTag">fallback</span> есть <span className="spanTag">false</span>, то какие - либо пути не возвращаемый <span className="spanTag">getStaticPaths</span> приведет к <strong>404 странице</strong>. Вы можете сделать это, если у вас есть небольшое количество путей для предварительного рендеринга, поэтому все они статически генерируются во время сборки. Это также полезно, когда новые страницы добавляются не часто. Если вы добавляете дополнительные элементы в источник данных и вам нужно отобразить новые страницы, вам придется снова запустить сборку.
</p>
<p>
Вот пример, который предварительно отображает одно сообщение в блоге на каждую вызываемую страницу <span className="spanTag">pages/posts/[id].js</span>. Список сообщений блога будет получен с CMS и возвращен <span className="spanTag">getStaticPaths</span>. Затем для каждой страницы он извлекает данные публикации из CMS, используя <span className="spanTag">getStaticProps</span>. Этот пример также есть в документации Pages.
</p>

<Highlight language="javascript">
  {`// pages/posts/[id].js

function Post({ post }) {
  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
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



<h4> <span className="spanTag">fallback: true</span></h4>
<p>Если <span className="spanTag">fallback true</span>, то поведение <span className="spanTag">getStaticProps</span> меняется:</p>

<p className='list'>
 - Возвращенные пути <span className="spanTag">getStaticPaths</span> будут преобразованы в HTML во время сборки.
</p>
<p className='list'>
 - Пути, которые не были созданы во время сборки, не приведут к странице 404. Вместо этого Next.js будет обслуживать «резервную» версию страницы при первом запросе на такой путь (подробности см. В разделе «Резервные страницы» ниже).
</p>
<p className='list'>
 - В фоновом режиме Next.js статически сгенерирует запрошенный путь HTML и JSON. Сюда входит и бег <span className="spanTag">getStaticProps</span>.
</p>
<p className='list'>
 - Когда это будет сделано, браузер получит JSON для созданного пути. Это будет использоваться для автоматического рендеринга страницы с необходимыми реквизитами. С точки зрения пользователя, страница будет заменена с резервной страницы на полную.
</p>
<p className='list'>
 - В то же время Next.js добавляет этот путь в список предварительно обработанных страниц. Последующие запросы к тому же пути будут обслуживать сгенерированную страницу, как и другие страницы, предварительно обработанные во время сборки.
</p>

<div className='note'> <span className="spanTag">fallback: true</span> не поддерживается при использовании <span className="spanTag">next export</span>.</div>

<h4>Резервные страницы</h4>
<p>В «резервной» версии страницы:</p>

<p className='list'> - Реквизит страницы будет пуст.</p>
<p className='list'> - Используя маршрутизатор, вы можете определить, <span className="spanTag">router.isFallback</span> будет ли отображаться резервная копия <span className="spanTag">true</span>.</p>

Вот пример, в котором используются <span className="spanTag">isFallback</span>:


<Highlight language="javascript">
  {`// pages/posts/[id].js
import { useRouter } from 'next/router'

function Post({ post }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only '/posts/1' and '/posts/2' are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: '/posts/3'
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post 'id'.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch('https://.../posts/\${params.id}')
  const post = await res.json()

  // Pass post data to the page via props
  return {
    props: { post },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}

export default Post`}
</Highlight>


<h4>Когда <span className="spanTag">fallback: true</span> пригодится?</h4>
<p>
<span className="spanTag">fallback: true</span> полезно, если в вашем приложении очень большое количество статических страниц, зависящих от данных (подумайте: очень большой сайт электронной коммерции). Вы хотите предварительно отрендерить все страницы продуктов, но тогда ваши сборки займут вечность.
</p>
<p>
Вместо этого вы можете статически сгенерировать небольшое подмножество страниц и использовать <span className="spanTag">fallback: true</span> для остальных. Когда кто-то запрашивает страницу, которая еще не создана, пользователь увидит страницу с индикатором загрузки. Вскоре после <span className="spanTag">getStaticProps</span> этого страница будет отображена с запрошенными данными. С этого момента все, кто запрашивает одну и ту же страницу, будут получать статически предварительно обработанную страницу.
</p>
<p>
Это гарантирует, что у пользователей всегда будет быстрый опыт, сохраняя при этом быстрые сборки и преимущества статической генерации.
</p>
<p>
<span className="spanTag">fallback: true</span> не будет обновлять сгенерированные страницы, для этого обратите внимание на инкрементную статическую регенерацию.
</p>


<h3>Когда я должен использовать <span className="spanTag">getStaticPaths</span>?</h3>
<p>
Вам следует использовать, <span className="spanTag">getStaticPaths</span> если вы статически предварительно обрабатываете страницы, использующие динамические маршруты.
</p>

<h3>TypeScript: использовать <span className="spanTag">GetStaticPaths</span></h3>

Для TypeScript вы можете использовать <span className="spanTag">GetStaticPaths</span> тип из <span className="spanTag">next</span>:


<Highlight language="javascript">
  {`import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}`}</Highlight>
        


<h3>Технические подробности</h3>
<h4>Используйте вместе с <span className="spanTag">getStaticProps</span></h4>
<p>
Когда вы используете <span className="spanTag">getStaticProps</span> на странице с параметрами динамического маршрута, вы должны использовать <span className="spanTag">getStaticPaths</span>.
</p>
<p>
Вы не можете использовать <span className="spanTag">getStaticPaths</span> с <span className="spanTag">getServerSideProps</span>.
</p>

<h4>Работает только во время сборки на стороне сервера</h4>
<p><span className="spanTag">getStaticPaths</span> выполняется только во время сборки на стороне сервера.</p>

<h4>Разрешено только на странице</h4>
<p>
<span className="spanTag">getStaticPaths</span> можно экспортировать только со страницы. Вы не можете экспортировать его из файлов, не являющихся страницами.
</p>
<p>
Также вы должны использовать <span className="spanTag">export async function getStaticPaths() {}</span> - он не будет работать, если вы добавите <span className="spanTag">getStaticPaths</span> как свойство компонента страницы.
</p>

<h4>Работает по каждому запросу в разработке</h4>
<p>
В development (<span className="spanTag">next dev</span>) <span className="spanTag">getStaticPaths</span> будет вызываться по каждому запросу.
</p>

<h2>
<span className="spanTag">getServerSideProps</span> (Рендеринг на стороне сервера)
</h2>
Если вы экспортируете <span className="spanTag">async</span> функцию, вызываемую <span className="spanTag">getServerSideProps</span> со страницы, Next.js будет предварительно отображать эту страницу при каждом запросе, используя данные, возвращаемые <span className="spanTag">getServerSideProps</span>.


<Highlight language="javascript">
  {`export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}`}
</Highlight>

<p> <span className="spanTag">context</span> Параметр представляет собой объект, содержащий следующие ключи:</p>
<p className='list'>
 - <span className="spanTag">params</span>: Если эта страница использует динамический маршрут, <span className="spanTag">params</span> содержит параметры маршрута. Если имя страницы будет <span className="spanTag">[id].js</span>, то <span className="spanTag">params</span> будет выглядеть так <span className="spanTag">{` id: ... `}</span>. Чтобы узнать больше, ознакомьтесь с документацией по динамической маршрутизации.
</p>
<p className='list'>
 - <span className="spanTag">req</span>: Объект HTTP IncomingMessage.
</p>
<p className='list'>
 - <span className="spanTag">res</span>: Объект ответа HTTP.
</p>
<p className='list'>
 - <span className="spanTag">query</span>: Строка запроса.
</p>
<p className='list'>
 - <span className="spanTag">preview</span>: <span className="spanTag">preview</span> <span className="spanTag">true</span> если страница находится в режиме предварительного просмотра и в <span className="spanTag">false</span> противном случае. См. Документацию по режиму предварительного просмотра.
</p>
<p className='list'>
 - <span className="spanTag">previewData</span>: Данные предварительного просмотра установлены <span className="spanTag">setPreviewData</span>. См. Документацию по режиму предварительного просмотра.
</p>
<div className='note'>
    <p>
   <strong>Примечание:</strong> вы можете импортировать модули в области верхнего уровня для использования в <span className="spanTag">getServerSideProps</span>. Импорты, используемые в <span className="spanTag">getServerSideProps</span>, не будут объединены для клиентской стороны.
    </p>
    <p>Это означает, что вы можете писать код на стороне сервера прямо в <span className="spanTag">getServerSideProps</span>. Это включает чтение из файловой системы или базы данных.
    </p>
</div>
<div className='note'>
    <p>
   <strong>Примечание:</strong> вы не должны использовать <span className="spanRed">fetch()</span> для вызова маршрута API в вашем приложении. Вместо этого напрямую импортируйте маршрут API и вызывайте его функцию самостоятельно. Для этого подхода вам может потребоваться небольшой рефакторинг вашего кода.
    </p>
    <p>Получение из внешнего API - это нормально!</p>
</div>


<h3>Простой пример</h3>
<p>
Вот пример, который используется <span className="spanTag">getServerSideProps</span> для получения данных во время запроса и их предварительной визуализации. Этот пример также есть в документации Pages.
</p>

<Highlight language="javascript">
  {`function Page({ data }) {
  // Render data...
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

<h3>Когда я должен использовать <span className="spanTag">getServerSideProps</span>?</h3>

Вы должны использовать <span className="spanTag">getServerSideProps</span> только в том случае, если вам нужно предварительно отобразить страницу, данные которой должны быть получены во время запроса. Время до первого байта (TTFB) будет медленнее, чем <span className="spanTag">getStaticProps</span> потому, что сервер должен вычислять результат по каждому запросу, и результат не может быть кэширован CDN без дополнительной настройки.
<p>
Если вам не нужно предварительно отрисовывать данные, вам следует рассмотреть возможность получения данных на стороне клиента. Щелкните здесь, чтобы узнать больше.
</p>

<h3>TypeScript: использовать <span className="spanTag">GetServerSideProps</span></h3>

Для TypeScript вы можете использовать <span className="spanTag">GetServerSideProps</span> тип из <span className="spanTag">next</span>:


<Highlight language="javascript">
  {`import { GetServerSideProps } from 'next'

export const getServerSideProps: 
        GetServerSideProps = async (context) => {
  // ...
}`}
</Highlight>
        

Если вы хотите получить предполагаемую типизацию для своих реквизитов, вы можете использовать <span className="spanTag">InferGetServerSidePropsType{`<typeof getServerSideProps>`}</span>, например:

<Highlight language="javascript">
  {`import { InferGetServerSidePropsType } from 'next'

type Data = { ... }

export const getServerSideProps = async () => {
  const res = await fetch('https://.../data')
  const data: Data = await res.json()

  return {
    props: {
      data,
    },
  }
}

function Page({ data }: 
    InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve posts to type Data
}
export default Page`}
</Highlight>
        

<h3>Технические подробности</h3>
<h4>Работает только на стороне сервера</h4>
<p>
<span className="spanTag">getServerSideProps</span> работает только на стороне сервера и никогда не запускается в браузере. Если на странице используется <span className="spanTag">getServerSideProps</span>, то:
</p>
<p className='list'>
 - Когда вы запрашиваете эту страницу напрямую, <span className="spanTag">getServerSideProps</span> запускается во время запроса, и эта страница будет предварительно отрисована с возвращенными реквизитами.
</p>
<p className='list'>
 - Когда вы запрашиваете эту страницу при переходах страниц на стороне клиента через <span className="spanTag">next/link</span>( документацию ) или <span className="spanTag">next/router</span>( документацию ), Next.js отправляет запрос API на сервер, который запускается <span className="spanTag">getServerSideProps</span>. Он вернет JSON, содержащий результат выполнения <span className="spanTag">getServerSideProps</span>, и JSON будет использоваться для визуализации страницы. Вся эта работа будет выполняться Next.js автоматически, поэтому вам не нужно делать ничего лишнего, пока вы <span className="spanTag">getServerSideProps</span> определили.
</p>
Вы можете использовать этот инструмент, чтобы проверить, что Next.js исключает из клиентского пакета.


<h4>Разрешено только на странице</h4>
<p>
<span className="spanTag">getServerSideProps</span> можно экспортировать только со страницы. Вы не можете экспортировать его из файлов, не являющихся страницами.
</p>

<p>
Также вы должны использовать <span className="spanTag">export async function getServerSideProps() {}</span> - он не будет работать, если вы добавите <span className="spanTag">getServerSideProps</span> как свойство компонента страницы.
</p>

<h2>Получение данных на стороне клиента</h2>
<p>
Если ваша страница содержит часто обновляемые данные, и вам не нужно их предварительно обрабатывать, вы можете получить данные на стороне клиента. Примером этого являются пользовательские данные. Вот как это работает:
</p>
<p className='list'>
 - Во-первых, сразу покажите страницу без данных. Части страницы могут быть предварительно обработаны с помощью статической генерации. Вы можете отображать состояния загрузки для отсутствующих данных.
</p>
<p className='list'>
 - Затем получите данные на стороне клиента и отобразите их, когда будете готовы.
</p>
Этот подход хорошо работает, например, для страниц пользовательской панели инструментов. Поскольку панель инструментов является частной страницей, ориентированной на пользователя, SEO не имеет значения, и страницу не нужно предварительно отрисовывать. Данные часто обновляются, что требует выборки данных во время запроса.

<h2>SWR</h2>

Команда Next.js создала перехватчик React для получения данных под названием SWR . Мы настоятельно рекомендуем его, если вы получаете данные на стороне клиента. Он обрабатывает кэширование, повторную проверку, отслеживание фокуса, повторную выборку через интервал и многое другое. И вы можете использовать это так:


<Highlight language="javascript">
{`import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
          `}
</Highlight>
        

            </div>
        </Docs>
    )
}

