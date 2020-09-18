import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
            <h1>Обслуживание статических файлов</h1>
            <p>
Next.js может обслуживать статические файлы, такие как изображения, в папке, называемой public в корневом каталоге. Затем на файлы можно ссылаться, начиная с базового URL (/).
            </p>
<p>
Например, если вы добавите изображение public/my-image.png, следующий код будет обращаться к нему:
</p>

<Highlight language="javascript">
{`function MyImage() {
  return <img src="/my-image.png" alt="my image" />
}

export default MyImage`}
</Highlight>
        

<p>
Эта папка также полезна для robots.txt проверки сайта Google и любых других статических файлов (в том числе .html)!
</p>

<div className='note'>
<strong>Примечание.</strong> Не называйте public каталог другим именем. Имя нельзя изменить, и это единственный каталог, используемый для обслуживания статических ресурсов.
</div>
<div className='note'>
<strong>Примечание.</strong> Убедитесь, что у вас нет статического файла с тем же именем, что и у файла в pages/каталоге, так как это приведет к ошибке.
</div>

            </div>
        </Docs>
    )
}