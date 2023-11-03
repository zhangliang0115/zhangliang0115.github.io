import{_ as n,o as s,c as a,a as e}from"./app-b6485265.js";const t={},l=e(`<h1 id="运维" tabindex="-1"><a class="header-anchor" href="#运维" aria-hidden="true">#</a> 运维</h1><h2 id="centos" tabindex="-1"><a class="header-anchor" href="#centos" aria-hidden="true">#</a> Centos</h2><h3 id="查看共享文件夹名称" tabindex="-1"><a class="header-anchor" href="#查看共享文件夹名称" aria-hidden="true">#</a> 查看共享文件夹名称</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vmware-hgfsclient
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="挂载目录" tabindex="-1"><a class="header-anchor" href="#挂载目录" aria-hidden="true">#</a> 挂载目录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vmhgfs-fuse <span class="token parameter variable">-h</span>

vmhgfs-fuse .host:/vm_share_config /usr/local/docker/config <span class="token parameter variable">-o</span> <span class="token assign-left variable">subtype</span><span class="token operator">=</span>vmhgfs-fuse,allow_other 
vmhgfs-fuse .host:/vm_share_data /usr/local/docker/share_data <span class="token parameter variable">-o</span> <span class="token assign-left variable">subtype</span><span class="token operator">=</span>vmhgfs-fuse,allow_other 
<span class="token comment">#将所有共享文件夹挂载到/usr/local/docker</span>
<span class="token function">sudo</span> vmhgfs-fuse .host:/ /usr/local/docker <span class="token parameter variable">-o</span> <span class="token assign-left variable">subtype</span><span class="token operator">=</span>vmhgfs-fuse,allow_other 
<span class="token comment">#将名称sharedfolder的共享挂载到/mnt/hgfs</span>
<span class="token function">sudo</span> vmhgfs-fuse .host:/sharedfolder /mnt/hgfs <span class="token parameter variable">-o</span> <span class="token assign-left variable">subtype</span><span class="token operator">=</span>vmhgfs-fuse,allow_other 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h2><h3 id="部署-tomcat" tabindex="-1"><a class="header-anchor" href="#部署-tomcat" aria-hidden="true">#</a> 部署 Tomcat</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.1&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">tomcat</span><span class="token punctuation">:</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> tomcat
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8080<span class="token punctuation">:</span><span class="token number">8080</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./webapps<span class="token punctuation">:</span>/usr/local/tomcat/webapps
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署-mysql" tabindex="-1"><a class="header-anchor" href="#部署-mysql" aria-hidden="true">#</a> 部署 MySQL</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.1&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token comment"># 目前 latest 版本为 MySQL8.x</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span><span class="token punctuation">-</span>default<span class="token punctuation">-</span>authentication<span class="token punctuation">-</span>plugin=mysql_native_password
      <span class="token punctuation">-</span><span class="token punctuation">-</span>character<span class="token punctuation">-</span>set<span class="token punctuation">-</span>server=utf8mb4
      <span class="token punctuation">-</span><span class="token punctuation">-</span>collation<span class="token punctuation">-</span>server=utf8mb4_general_ci
      <span class="token punctuation">-</span><span class="token punctuation">-</span>explicit_defaults_for_timestamp=true
      <span class="token punctuation">-</span><span class="token punctuation">-</span>lower_case_table_names=1
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 3306<span class="token punctuation">:</span><span class="token number">3306</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/var/lib/mysql
  <span class="token comment"># MySQL 的 Web 客户端</span>
  <span class="token key atrule">adminer</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> adminer
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8080<span class="token punctuation">:</span><span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署-gitlab" tabindex="-1"><a class="header-anchor" href="#部署-gitlab" aria-hidden="true">#</a> 部署 GitLab</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&#39;twang2218/gitlab-ce-zh&#39;</span>
      <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
      <span class="token key atrule">hostname</span><span class="token punctuation">:</span> <span class="token string">&#39;192.168.10.120&#39;</span>
      <span class="token key atrule">environment</span><span class="token punctuation">:</span>
        <span class="token key atrule">TZ</span><span class="token punctuation">:</span> <span class="token string">&#39;Asia/Shanghai&#39;</span>
        <span class="token key atrule">GITLAB_OMNIBUS_CONFIG</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          external_url &#39;http://192.168.10.120&#39;
          gitlab_rails[&#39;gitlab_shell_ssh_port&#39;] = 2222
          unicorn[&#39;port&#39;] = 8888
          nginx[&#39;listen_port&#39;] = 80</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token string">&#39;80:80&#39;</span>
        <span class="token punctuation">-</span> <span class="token string">&#39;443:443&#39;</span>
        <span class="token punctuation">-</span> <span class="token string">&#39;2222:22&#39;</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> ./config<span class="token punctuation">:</span>/etc/gitlab
        <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/var/opt/gitlab
        <span class="token punctuation">-</span> ./logs<span class="token punctuation">:</span>/var/log/gitlab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署-nexus" tabindex="-1"><a class="header-anchor" href="#部署-nexus" aria-hidden="true">#</a> 部署 Nexus</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.1&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">nexus</span><span class="token punctuation">:</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">image</span><span class="token punctuation">:</span> sonatype/nexus3
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nexus
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 80<span class="token punctuation">:</span><span class="token number">8081</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> data<span class="token punctuation">:</span>/nexus<span class="token punctuation">-</span>data
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),i=[l];function p(c,o){return s(),a("div",null,i)}const r=n(t,[["render",p],["__file","index.html.vue"]]);export{r as default};
