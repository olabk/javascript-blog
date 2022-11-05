'use strict';

const titleClickHandler = function(event){
  const clickedElement = this;
  console.log('Link was clicked!');
  event.preventDefault();

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleId = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const article = document.querySelector(articleId);

  /* add class 'active' to the correct article */
  article.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optAuthorListSelector = '.authors',
  optTagsListSelector = '.list.tags',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector){
  if (customSelector == undefined)
    customSelector = '';

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  /* for each article */
  for (const article of articles) {
  
    /* get the article id */
    const articleId = article.id;

    /* find the title element */
    const titleElement = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    const articleTitle = titleElement.innerHTML;
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
    //titleList.insertAdjacentHTML("beforeend", linkHTML);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = {min: 999999 , max:0};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  
  }
  return params;
}

function calculateTagClass (count, params){
  return '';
}

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll('article');
  
  /* START LOOP: for every article: */
  for (const article of articles) {
    
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const tags = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of tags) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
  
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  
  const tagsParams = calculateTagsParams(allTags);
   
  let allTagsHTML = '';

  for(let tag in allTags){
    const tagClass = calculateTagClass (allTags[tag], tagsParams);
    allTagsHTML += '<a class="'+tagClass+'" href="#tag-' + tag + '"><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a>';
  }

  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]'); 
  /* START LOOP: for each active tag link */
  for (const activeLink of activeLinks) {

    /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (const tagLink of sameTagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]')
}

function addClickListenersToTags(){  
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (const linkTag of linkTags) {
  
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler); 
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll('article');

  const authors = new Set();

  /* START LOOP: for every article: */
  for (const article of articles) {
  
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
   
    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');
    authors.add(author);

    const linkHTML = generateAuthorLink(author);
    authorWrapper.innerHTML = linkHTML;

  /* END LOOP: for every article: */
  }

  const authorList = document.querySelector(optAuthorListSelector);
  authorList.innerHTML = '';

  for (const author of authors) {
    const linkHTML = '<li>' + generateAuthorLink(author) + '</li>';
    authorList.innerHTML += linkHTML;
  }
}

function generateAuthorLink(author) {
  return '<a href="#author-' + author.replace(' ', '_') + '"><span>' + author + '</span></a>';
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
 
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]'); 
  /* START LOOP: for each active author link */
  for (const activeLink of activeLinks) {

    /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const sameAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for (const authorLink of sameAuthorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found author link */
  }

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '').replace('_', ' ');

  /* execute function "generateAuthorLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){  
  /* find all links to authors */
  const linkAuthors = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (const linkAuthor of linkAuthors) {
  
    /* add authorClickHandler as event listener for that link */
    linkAuthor.addEventListener('click', authorClickHandler); 
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();