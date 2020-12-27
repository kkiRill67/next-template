import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
            <h1>Обслуживание статических файлов</h1>
            <p>
Next.js может обслуживать статические файлы, такие как изображения, в папке, называемой <span className="spanTag">public</span> в корневом каталоге. Затем на файлы можно ссылаться, начиная с базового URL (<span className="spanTag">/</span>).
            </p>
<p>
Например, если вы добавите изображение <span className="spanTag">public/my-image.png</span>, следующий код будет обращаться к нему:
</p>

<Highlight language="javascript">
{`import Image from 'next/image'

function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />
}

export default Avatar`}
</Highlight>
        

<p>
Эта папка также полезна для <span className="spanTag">robots.txt</span>, <span className="spanTag">favicon.ico</span>, проверки сайта Google и любых других статических файлов (в том числе <span className="spanTag">.html</span>)!
</p>

<div className='note'>
<strong>Примечание.</strong> Не называйте <span className="spanTag">public</span> каталог другим именем. Имя нельзя изменить, и это единственный каталог, используемый для обслуживания статических ресурсов.
</div>
<div className='note'>
<strong>Примечание.</strong> Убедитесь, что у вас нет статического файла с тем же именем, что и у файла в <span className="spanTag">pages/</span> каталоге, так как это приведет к ошибке.
</div>

<div className='note'>
<strong>Примечание.</strong> Next.js. будет обслуживать только те ресурсы, которые находятся в каталоге <span className="spanTag">public</span> во время сборки. Файлы, добавленные во время выполнения, будут недоступны. Мы рекомендуем использовать сторонний сервис, например AWS S3, для постоянного хранения файлов.
</div>

            </div>
        </Docs>
    )
}