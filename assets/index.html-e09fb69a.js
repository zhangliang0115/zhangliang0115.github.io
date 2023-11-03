import{_ as n,o as s,c as a,a as e}from"./app-b6485265.js";const t={},i=e(`<h1 id="jenkins-安装" tabindex="-1"><a class="header-anchor" href="#jenkins-安装" aria-hidden="true">#</a> Jenkins 安装</h1><p>官网 https://jenkins.io/zh/</p><h2 id="docker-方式安装" tabindex="-1"><a class="header-anchor" href="#docker-方式安装" aria-hidden="true">#</a> docker 方式安装</h2><p>1、创建 jenkins 文件夹</p><p>2、创建 data 数据存储目录</p><p>3、Docker 数据卷 权限问题 chown -R 1000 data</p><p>4、创建 docker-compose.yml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.1&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">jenkins</span><span class="token punctuation">:</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">image</span><span class="token punctuation">:</span> jenkins/jenkins
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> jenkins
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token comment"># 发布端口</span>
      <span class="token punctuation">-</span> 8080<span class="token punctuation">:</span><span class="token number">8080</span>
      <span class="token comment"># 基于 JNLP 的 Jenkins 代理通过 TCP 端口 50000 与 Jenkins master 进行通信</span>
      <span class="token punctuation">-</span> 50000<span class="token punctuation">:</span><span class="token number">50000</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /usr/bin/docker<span class="token punctuation">:</span>/usr/bin/docker
      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/var/jenkins_home
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="centos-方式安装" tabindex="-1"><a class="header-anchor" href="#centos-方式安装" aria-hidden="true">#</a> centos 方式安装</h2><p>清华源</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> https://mirrors.tuna.tsinghua.edu.cn/jenkins/redhat/jenkins-2.316-1.1.noarch.rpm
<span class="token function">vim</span> /etc/sysconfig/jenkins
JENKINS_USER <span class="token operator">=</span> root
查看密码
<span class="token function">cat</span> /var/lib/jenkins/secrets/initialAdminPassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&#39;1.1&#39; encoding=&#39;UTF-8&#39;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sites</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>site</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>default<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>site</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sites</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/http:\\/\\/updates.jenkins-ci.org\\/download/https:\\/\\/mirrors.tuna.tsinghua.edu.cn\\/jenkins/g&#39;</span> default.json
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/http:\\/\\/www.google.com/https:\\/\\/www.baidu.com/g&#39;</span> default.json
systmctl restart jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/http:\\/\\/updates.jenkins-ci.org\\/download/https:\\/\\/mirrors.tuna.tsinghua.edu.cn\\/jenkins/g&#39;</span> default.json
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/http:\\/\\/www.google.com/https:\\/\\/www.baidu.com/g&#39;</span> default.json
systmctl restart jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),p=[i];function l(c,o){return s(),a("div",null,p)}const d=n(t,[["render",l],["__file","index.html.vue"]]);export{d as default};
