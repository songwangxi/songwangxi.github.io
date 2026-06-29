---
layout: post
title: 文章分类
permalink: /categories/
---

<div class="categories-archive">
  {% assign tags = site.tags | sort %}
  {% if tags.size > 0 %}
    {% for tag in tags %}
      <div class="tag-group">
        <h2 class="tag-heading">
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
    {% endfor %}
  {% else %}
    <p>暂无文章分类。</p>
  {% endif %}
</div>
