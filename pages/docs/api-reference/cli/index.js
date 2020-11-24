import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Next.js CLI</h1>

Интерфейс командной строки Next.js позволяет запускать, создавать и экспортировать приложение.
<p>Чтобы получить список доступных команд CLI, выполните следующую команду в каталоге проекта:</p>


<Highlight language="node">
{`npx next -h`}
</Highlight>
<i>( npx поставляется с npm 5.2+ и выше)</i>
<p>Результат должен выглядеть так:</p>



<Highlight language="node">
{`Usage
  $ next <command>

Available commands
  build, start, export, dev, telemetry

Options
  --version, -v   Version number
  --help, -h      Displays this message

For more information run a command with the --help flag
  $ next build --help`}
</Highlight>

Вы можете передавать любые аргументы узла к <span className="spanTag">next</span> командам:

<Highlight language="node">
{`NODE_OPTIONS='--throw-deprecation' next
NODE_OPTIONS='-r esm' next
NODE_OPTIONS='--inspect' next`}
</Highlight>

<h2>Построить</h2>
<p><span className="spanTag">next build</span> создает оптимизированную производственную сборку вашего приложения. На выходе отображается информация о каждом маршруте.</p>

<p className="list">
 - Размер - количество ресурсов, загруженных при переходе на страницу на стороне клиента. Размер каждого маршрута включает только его зависимости.
</p>
<p className="list">
 - First Load JS - количество ресурсов, загруженных при посещении страницы с сервера. Общее количество JS-кода отображается как отдельный показатель.
</p>

Первая загрузка окрашена в зеленый, желтый или красный цвет. Стремитесь к экологичности для эффективных приложений.
<p>Вы можете включить производственное профилирование для React с <span className="spanTag">--profile</span> флагом в <span className="spanTag">next build</span>. Для этого требуется Next.js 9.5 :</p>


<Highlight language="node">
{`next build --profile`}
</Highlight>

После этого вы можете использовать профилировщик так же, как и при разработке.
<p>Вы можете включить более подробный вывод сборки с помощью <span className="spanTag">--debug</span> флага в <span className="spanTag">next build</span>. Для этого требуется Next.js 9.5.3:</p>


<Highlight language="node">
{`next build --debug`}
</Highlight>

Если этот флаг включен, будут отображаться дополнительные выходные данные сборки, такие как перезапись, перенаправление и заголовки.

<h2>Развитие</h2>

<span className="spanTag">next dev</span> запускает приложение в режиме разработки с перезагрузкой горячего кода, сообщением об ошибках и многим другим:
<p>По умолчанию приложение запускается в http://localhost:3000. Порт по умолчанию можно изменить следующим образом <span className="spanTag">-p</span>:</p>


<Highlight language="node">
{`npx next dev -p 4000`}
</Highlight>

<h2>Производство</h2>

<span className="spanTag">next start</span> запускает приложение в рабочем режиме. Приложение должно быть скомпилировано в <span className="spanTag">next build</span> первую очередь.
<p>По умолчанию приложение запускается в http://localhost:3000. Порт по умолчанию можно изменить следующим образом <span className="spanTag"> -p</span>:</p>


<Highlight language="node">
{`npx next start -p 4000`}
</Highlight>

<h2>Телеметрия</h2>

Next.js собирает полностью анонимные телеметрические данные об общем использовании. Участие в этой анонимной программе необязательно, и вы можете отказаться от участия, если не хотите делиться какой-либо информацией.

            </div>
        </Docs>
    )
}