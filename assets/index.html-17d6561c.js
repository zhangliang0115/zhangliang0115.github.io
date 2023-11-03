import{_ as r,r as d,o as c,c as o,b as n,d as s,e,w as i,a as l}from"./app-b6485265.js";const p={},u=n("h1",{id:"vuepress-使用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vuepress-使用","aria-hidden":"true"},"#"),s(" Vuepress 使用")],-1),v={href:"https://vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},m=n("h2",{id:"markdown-语法说明",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#markdown-语法说明","aria-hidden":"true"},"#"),s(" Markdown 语法说明")],-1),b={href:"https://www.w3cschool.cn/markdownyfsm/",target:"_blank",rel:"noopener noreferrer"},h={href:"http://www.markdown.cn/",target:"_blank",rel:"noopener noreferrer"},g=l(`<h2 id="markdown-拓展" tabindex="-1"><a class="header-anchor" href="#markdown-拓展" aria-hidden="true">#</a> Markdown 拓展</h2><h3 id="github-风格的表格" tabindex="-1"><a class="header-anchor" href="#github-风格的表格" aria-hidden="true">#</a> GitHub 风格的表格</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>Tables</th><th style="text-align:center;">Are</th><th style="text-align:right;">Cool</th></tr></thead><tbody><tr><td>col 3 is</td><td style="text-align:center;">right-aligned</td><td style="text-align:right;">$1600</td></tr><tr><td>col 2 is</td><td style="text-align:center;">centered</td><td style="text-align:right;">$12</td></tr><tr><td>zebra stripes</td><td style="text-align:center;">are neat</td><td style="text-align:right;">$1</td></tr></tbody></table><h3 id="emoji" tabindex="-1"><a class="header-anchor" href="#emoji" aria-hidden="true">#</a> Emoji</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>:tada: :100:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>🎉 💯</p><h3 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[[toc]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),k={class:"table-of-contents"},f=l(`<h3 id="自定义容器" tabindex="-1"><a class="header-anchor" href="#自定义容器" aria-hidden="true">#</a> 自定义容器</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>This is a tip</p></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>This is a warning</p></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>This is a dangerous warning</p></div><p>你也可以自定义块中的标题：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>::: danger STOP
Danger zone, do not proceed
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">STOP</p><p>Danger zone, do not proceed</p></div><h3 id="导入代码段" tabindex="-1"><a class="header-anchor" href="#导入代码段" aria-hidden="true">#</a> 导入代码段</h3><p>你可以通过下述的语法导入已经存在的文件中的代码段：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>&lt;&lt;&lt; @/filepath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它也支持行高亮:</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>&lt;&lt;&lt; @/filepath{highlightLines} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Input</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;&lt;&lt; @/test/markdown/fragments/snippet.js{2}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="travis-ci-实现-vuepress-自动部署" tabindex="-1"><a class="header-anchor" href="#travis-ci-实现-vuepress-自动部署" aria-hidden="true">#</a> Travis CI 实现 Vuepress 自动部署</h2><p>参考地址：</p>`,17),x={href:"https://travis-ci.com/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://juejin.im/entry/5bac1c565188255c953835db",target:"_blank",rel:"noopener noreferrer"},w={href:"https://zhuanlan.zhihu.com/p/36390666",target:"_blank",rel:"noopener noreferrer"},E=l(`<h3 id="一、安装-vuepress" tabindex="-1"><a class="header-anchor" href="#一、安装-vuepress" aria-hidden="true">#</a> 一、安装 vuepress</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><blockquote><p>如果你想在一个现有项目中使用 VuePress，同时想要在该项目中管理文档，则应该将 VuePress 安装为本地依赖。</p></blockquote></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将 VuePress 作为一个本地依赖安装</span>
<span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress <span class="token comment"># 或者：npm install -D vuepress</span>

<span class="token comment"># 新建一个 docs 文件夹</span>
<span class="token function">mkdir</span> docs

<span class="token comment"># 新建一个 markdown 文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;# Hello VuePress!&quot;</span> <span class="token operator">&gt;</span> docs/README.md

<span class="token comment"># 开始写作</span>
npx vuepress dev docs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，在 <code>package.json</code> 里加一些脚本:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以开始写作了:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">yarn</span> docs:dev <span class="token comment"># 或者：npm run docs:dev</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="二、github-pages-部署" tabindex="-1"><a class="header-anchor" href="#二、github-pages-部署" aria-hidden="true">#</a> 二、GitHub Pages 部署</h3><ol><li>在 <strong>docs/.vuepress/config.jsbak</strong> 中设置正确的 <strong>base</strong>。</li></ol><p>如果你打算发布到 <code>https://&lt;USERNAME&gt;.github.io/</code>，则可以省略这一步，因为 <strong>base</strong> 默认即是 “/“。</p><p>在你的项目中，创建一个如下的 deploy.sh 文件（请自行判断去掉高亮行的注释）:<code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</code>（也就是说你的仓库在 <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code>），则将 <strong>base</strong> 设置为 <code>&quot;/&lt;REPO&gt;/&quot;</code>。</p><ol><li><p>在你的项目中，创建一个如下的 <strong>deploy.sh</strong> 文件（请自行判断去掉高亮行的注释）:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run docs:build

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># 如果是发布到自定义域名</span>
<span class="token comment"># echo &#39;www.example.com&#39; &gt; CNAME</span>

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;deploy&#39;</span>

<span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span>

<span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span>

<span class="token builtin class-name">cd</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="三、集成travis-ci" tabindex="-1"><a class="header-anchor" href="#三、集成travis-ci" aria-hidden="true">#</a> 三、集成travis-ci</h3><p>先用github账号登录travis网站，然后同步你的仓库， 然后勾选我们的项目仓库（是保存文档的仓库而不是放生成页面的仓库）</p><p>配置 .travis.yml</p><p>然后在你的项目文件夹新建文件 <strong>.travis.yml</strong>， 这个文件内容根据你的项目而定，比如我们的项目可以是这样的。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">language</span><span class="token punctuation">:</span> node_js
<span class="token key atrule">sudo</span><span class="token punctuation">:</span> required
<span class="token key atrule">node_js</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> 8.11.3
<span class="token key atrule">branch</span><span class="token punctuation">:</span> master
<span class="token key atrule">cache</span><span class="token punctuation">:</span>
  <span class="token key atrule">directories</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node_modules
<span class="token key atrule">before_install</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> export TZ=&#39;Asia/Shanghai&#39;  <span class="token comment"># 设置时区</span>
<span class="token key atrule">script</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ./deploy.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="access-token" tabindex="-1"><a class="header-anchor" href="#access-token" aria-hidden="true">#</a> access_token</h4><p>首先在github的 <strong>setting</strong> -&gt; <strong>developer setting</strong> -&gt; <strong>personal access token</strong>一栏点击<strong>generate new token</strong>， 这下面的选项全选，然后就会生成一个token，复制这个token。</p><p>进入travis后台，在环境变量（Environment Variables）里设置键值对，比如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>access_token &lt;把复制的token黏贴在这&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="修改deploy-sh" tabindex="-1"><a class="header-anchor" href="#修改deploy-sh" aria-hidden="true">#</a> 修改deploy.sh</h4><p>集成 travis 还需要我们修改 <code>deploy.sh</code>,</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run docs:build

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># 如果是发布到自定义域名</span>
<span class="token comment"># echo &#39;www.example.com&#39; &gt; CNAME</span>

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;deploy&#39;</span>

<span class="token function">git</span> config <span class="token parameter variable">--local</span> user.name <span class="token string">&quot;杨俊宁&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--local</span> user.email <span class="token string">&quot;1003719811@qq.com&quot;</span>

<span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span>

<span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span>

<span class="token comment"># 如果使用 travis 持续集成</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> https://<span class="token variable">\${access_token}</span>@github.com/<span class="token operator">&lt;</span>USERNAME<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>REPO<span class="token operator">&gt;</span>.git master:gh-pages

<span class="token builtin class-name">cd</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="将-deploy-sh-变成可执行文件" tabindex="-1"><a class="header-anchor" href="#将-deploy-sh-变成可执行文件" aria-hidden="true">#</a> 将 deploy.sh 变成可执行文件</h4><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>在项目根目录下执行该命令</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> update-index <span class="token parameter variable">--add</span> <span class="token parameter variable">--chmod</span><span class="token operator">=</span>+x build.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在在试着push，观察travis服务器日志是否成功。</p>`,28);function y(R,A){const t=d("ExternalLinkIcon"),a=d("router-link");return c(),o("div",null,[u,n("p",null,[s("官网地址："),n("a",v,[s("https://vuepress.vuejs.org/zh/"),e(t)])]),m,n("p",null,[n("a",b,[s("https://www.w3cschool.cn/markdownyfsm/"),e(t)])]),n("p",null,[s("官网地址："),n("a",h,[s("http://www.markdown.cn/"),e(t)])]),g,n("nav",k,[n("ul",null,[n("li",null,[e(a,{to:"#markdown-语法说明"},{default:i(()=>[s("Markdown 语法说明")]),_:1})]),n("li",null,[e(a,{to:"#markdown-拓展"},{default:i(()=>[s("Markdown 拓展")]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#github-风格的表格"},{default:i(()=>[s("GitHub 风格的表格")]),_:1})]),n("li",null,[e(a,{to:"#emoji"},{default:i(()=>[s("Emoji")]),_:1})]),n("li",null,[e(a,{to:"#目录"},{default:i(()=>[s("目录")]),_:1})]),n("li",null,[e(a,{to:"#自定义容器"},{default:i(()=>[s("自定义容器")]),_:1})]),n("li",null,[e(a,{to:"#导入代码段"},{default:i(()=>[s("导入代码段")]),_:1})])])]),n("li",null,[e(a,{to:"#travis-ci-实现-vuepress-自动部署"},{default:i(()=>[s("Travis CI 实现 Vuepress 自动部署")]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#一、安装-vuepress"},{default:i(()=>[s("一、安装 vuepress")]),_:1})]),n("li",null,[e(a,{to:"#二、github-pages-部署"},{default:i(()=>[s("二、GitHub Pages 部署")]),_:1})]),n("li",null,[e(a,{to:"#三、集成travis-ci"},{default:i(()=>[s("三、集成travis-ci")]),_:1})])])])])]),f,n("p",null,[n("a",x,[s("https://travis-ci.com/"),e(t)])]),n("p",null,[n("a",_,[s("https://juejin.im/entry/5bac1c565188255c953835db"),e(t)])]),n("p",null,[n("a",w,[s("https://zhuanlan.zhihu.com/p/36390666"),e(t)])]),E])}const N=r(p,[["render",y],["__file","index.html.vue"]]);export{N as default};
