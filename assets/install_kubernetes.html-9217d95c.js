import{_ as s,o as n,c as e,a}from"./app-b6485265.js";const i={},o=a(`<h1 id="基于kubesphere安装kubernetes" tabindex="-1"><a class="header-anchor" href="#基于kubesphere安装kubernetes" aria-hidden="true">#</a> 基于kubesphere安装kubernetes</h1><h2 id="install-docker" tabindex="-1"><a class="header-anchor" href="#install-docker" aria-hidden="true">#</a> install docker</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#https://www.runoob.com/docker/centos-docker-install.html</span>
<span class="token comment"># step 1: 安装必要的一些系统工具</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
<span class="token comment"># Step 2: 添加软件源信息</span>
yum-config-manager  --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment"># Step 3: 更新并安装 Docker-CE</span>
yum makecache fast
<span class="token comment">#列出并排序您存储库中可用的版本。此示例按版本号（从高到低）对结果进行排序</span>
yum list docker-ce <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
<span class="token comment">#安装最新版本</span>
yum <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
<span class="token comment">#安装指定版本</span>
yum <span class="token function">install</span> docker-ce-<span class="token operator">&lt;</span>VERSION_STRING<span class="token operator">&gt;</span> docker-ce-cli-<span class="token operator">&lt;</span>VERSION_STRING<span class="token operator">&gt;</span> containerd.io
yum <span class="token function">install</span> docker-ce-19.03.8 docker-ce-cli-19.03.8 containerd.io
<span class="token comment">#启动docker</span>
systemctl start <span class="token function">docker</span>

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://bd24tajg.mirror.aliyuncs.com&quot;]
}
EOF</span>
systemctl daemon-reload
systemctl restart <span class="token function">docker</span>
<span class="token comment">#下载KubeKey</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KKZONE</span><span class="token operator">=</span>cn
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get-kk.kubesphere.io <span class="token operator">|</span> <span class="token assign-left variable">VERSION</span><span class="token operator">=</span>v1.1.1 <span class="token function">sh</span> -
<span class="token function">chmod</span> +x kk
<span class="token comment">#设置hostname</span>
hostnamectl set-hostname  k8s
<span class="token comment">#安装依赖</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> conntrack
<span class="token comment">#安装kubernetes集群</span>
./kk create cluster --with-kubernetes v1.20.4

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**仅安装kubernetes **</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./kk create cluster --with-kubernetes v1.20.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装kubernetes和kubesphere" tabindex="-1"><a class="header-anchor" href="#安装kubernetes和kubesphere" aria-hidden="true">#</a> 安装kubernetes和kubesphere</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./kk create cluster --with-kubernetes v1.20.4 --with-kubesphere v3.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-ruby line-numbers-mode" data-ext="rb"><pre class="language-ruby"><code>curl <span class="token operator">-</span><span class="token constant">L</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>get<span class="token punctuation">.</span>daocloud<span class="token punctuation">.</span>io<span class="token operator">/</span>docker<span class="token operator">/</span>compose<span class="token operator">/</span>releases<span class="token operator">/</span>download<span class="token operator">/</span><span class="token number">1.12</span><span class="token number">.0</span><span class="token operator">/</span>docker<span class="token operator">-</span>compose<span class="token operator">-</span><span class="token command-literal"><span class="token command string">\`uname -s\`</span></span><span class="token operator">-</span><span class="token command-literal"><span class="token command string">\`uname -m\`</span></span> <span class="token operator">&gt;</span> <span class="token operator">/</span>usr<span class="token operator">/</span>local<span class="token operator">/</span>bin<span class="token operator">/</span>docker<span class="token operator">-</span>compose

chmod <span class="token operator">+</span>x <span class="token operator">/</span>usr<span class="token operator">/</span>local<span class="token operator">/</span>bin<span class="token operator">/</span>docker<span class="token operator">-</span>compose

　　docker<span class="token operator">-</span>compose version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose-install" tabindex="-1"><a class="header-anchor" href="#docker-compose-install" aria-hidden="true">#</a> docker-compose install</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> https://get.daocloud.io/docker/compose/releases/download/1.21.0/docker-compose-<span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">\`</span></span>-<span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">\`</span></span> <span class="token operator">&gt;</span> /usr/local/bin/docker-compose

<span class="token function">chmod</span> +x /usr/local/bin/docker-compose

<span class="token function">docker-compose</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ingress nginx</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://kubernetes.github.io/ingress-nginx/deploy/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">异常问题参考</p><p>https://blog.csdn.net/qq_39218530/article/details/115372879</p><p>我刚开始使用yaml的方式创建nginx-ingress，之后删除了它创建的命名空间以及 clusterrole and clusterrolebinding ，但是没有删除ValidatingWebhookConfiguration ingress-nginx-admission，这个ingress-nginx-admission是在yaml文件中安装的。当我再次使用helm安装nginx-ingress之后，创建自定义的ingress就会报这个错误。</p><p>kubectl get validatingwebhookconfigurations ingress-nginx-admission</p></div><div class="custom-container tip"><p class="custom-container-title">无法访问</p><p>https://www.cnblogs.com/Eddy24/articles/15355697.html ingress-controller#deployment 加入 hostNetwork: true</p></div><p>habor install</p><p>https://github.com/goharbor/harbor/releases</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> harbor-offline-installer-v2.3.3.tgz 
<span class="token builtin class-name">cd</span> harbor
<span class="token number">118.190</span>.159.170
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>habor docker config</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
  &quot;insecure-registries&quot;:[&quot;hub.com&quot;]
}
tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://bd24tajg.mirror.aliyuncs.com&quot;],
  &quot;insecure-registries&quot;:[&quot;hub.com&quot;]
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),t=[o];function l(r,c){return n(),e("div",null,t)}const d=s(i,[["render",l],["__file","install_kubernetes.html.vue"]]);export{d as default};
