---
layout: page
title: 文章分类
permalink: /categories/
---

<div class="categories-archive">
  {% assign tags = site.tags | sort %}
  {% for tag in tags %}
    <div class="tag-group">
      <h2 id="{{ tag[0] | slugify }}" class="tag-heading">
        <i class="fa fa-tag"></i> {{ tag[0] }}
      </h2>
      <ul class="post-list-by-tag">
        {% for post in tag[1] %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% else %}
    <p>暂无文章分类。</p>
  {% endfor %}
</div>
