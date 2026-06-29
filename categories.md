---
layout: page
title: 文章分类
permalink: /categories/
---

<style>
.categories-archive {
    max-width: 900px;
    margin: 0 auto;
}

.tag-group {
    margin-bottom: 2.5rem;
}

.tag-heading {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: #1e293b;
    border-bottom: 2px solid #4f46e5;
    padding-bottom: 0.3rem;
}

.tag-heading i {
    color: #4f46e5;
}

.post-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
}
</style>

<div class="categories-archive">
  {% assign tags = site.tags | sort %}
  {% if tags.size > 0 %}
    {% for tag in tags %}
      <div class="tag-group">
        <h2 class="tag-heading">
          <i class="fa fa-tag"></i> {{ tag[0] }}
        </h2>
        <div class="post-grid">
          {% for post in tag[1] %}
            <div class="card post-card card-tilt">
              <a href="{{ post.url | relative_url }}" class="post-title link-underline">{{ post.title }}</a>
              <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
            </div>
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  {% else %}
    <p>暂无文章分类。</p>
  {% endif %}
</div>
