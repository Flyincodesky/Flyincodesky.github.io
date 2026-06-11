---
layout: page
permalink: /activities/
title: 活动与新闻
description: 实验室举办的学术活动、讲座与重要新闻
nav: true
nav_order: 5
---

<style>
.activity-item {
  margin-bottom: 3rem;
  padding: 2rem;
  border-left: 4px solid #3498db;
  background: var(--global-card-bg-color);
  border-radius: 4px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.activity-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--global-text-color);
  margin: 0;
}

.activity-date {
  color: var(--global-text-color-light);
  font-size: 0.95rem;
}

.activity-type {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-right: 0.5rem;
}

.type-seminar {
  background: #3498db;
  color: white;
}

.type-workshop {
  background: #e74c3c;
  color: white;
}

.type-visit {
  background: #2ecc71;
  color: white;
}

.type-award {
  background: #f39c12;
  color: white;
}

.type-paper {
  background: #9b59b6;
  color: white;
}

.type-project {
  background: #1abc9c;
  color: white;
}

.activity-content {
  margin-top: 1rem;
  line-height: 1.8;
}

.activity-images {
  margin-top: 1.5rem;
}
</style>

<p class="lead">
  实验室定期举办学术讲座、研讨会等活动，并与国内外学术界保持密切交流。
  欢迎对我们的研究方向感兴趣的师生参加！
</p>

---

{% assign activities = site.news | sort: "date" | reverse %}
{% assign current_year = "" %}

{% for item in activities %}
  {% assign item_year = item.date | date: "%Y" %}
  {% if item_year != current_year %}
    {% unless forloop.first %}
---
    {% endunless %}
## {{ item_year }}年活动
    {% assign current_year = item_year %}
  {% endif %}

<div class="activity-item">
  <div class="activity-header">
    <div>
      <span class="activity-type {{ item.activity_class | default: 'type-paper' }}">{{ item.activity_type | default: '新闻动态' }}</span>
      <h3 class="activity-title">{{ item.activity_title | default: item.title | default: '实验室动态' }}</h3>
    </div>
    <div class="activity-date">{{ item.date | date: "%Y年%-m月%-d日" }}</div>
  </div>

  <div class="activity-content">
    {{ item.content }}
  </div>
</div>
{% endfor %}

<div class="text-center mt-5 mb-5">
  <h4>了解更多实验室动态</h4>
  <p>关注本网站获取最新消息。</p>
</div>
