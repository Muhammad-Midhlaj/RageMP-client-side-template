function asArr(arrayLike) {
    return [].slice.call(arrayLike, 0);
}

function setActiveArticle(articlesNodes, activeArticleNode) {
    articlesNodes.forEach(function(articleNode) {
        if (articleNode === activeArticleNode) {
            articleNode.classList.add('current');
        } else {
            articleNode.classList.remove('current');
        }
    });
}

function getNextArticle(articlesNodes, articleNode) {
    var articleIndex = articlesNodes.indexOf(articleNode);
    var totalArticlesIndexes = articlesNodes.length - 1;
    if (articleIndex === totalArticlesIndexes) {
        return articlesNodes[0];
    } else {
        return articlesNodes[articleIndex + 1]; 
    }
}

function getPrevArticle(articlesNodes, articleNode) {
    var articleIndex = articlesNodes.indexOf(articleNode);
    var totalArticlesIndexes = articlesNodes.length - 1;
    if (articleIndex === 0) {
        return articlesNodes[totalArticlesIndexes];
    } else {
        return articlesNodes[articleIndex - 1] ;
    }
}

var ACTIVE_ARTICLE_DEFAULT_INDEX = 0;
function main(inside) {
    var articlesNodes = asArr(document.querySelectorAll(`${inside} .news li`));
    var nextNode = document.querySelector(`${inside} .next`);
    var prevNode = document.querySelector(`${inside} .prev`);

    //console.log('got', articlesNodes);
    var currentlyActiveArticle = articlesNodes[ACTIVE_ARTICLE_DEFAULT_INDEX];

    setActiveArticle(articlesNodes, currentlyActiveArticle);

    nextNode.addEventListener('click', function () {
        var nextArticle = getNextArticle(articlesNodes, currentlyActiveArticle);
        setActiveArticle(articlesNodes, nextArticle);
        currentlyActiveArticle = nextArticle;
    });

    prevNode.addEventListener('click', function () {
        var prevArticle = getPrevArticle(articlesNodes, currentlyActiveArticle);
        setActiveArticle(articlesNodes, prevArticle);
        currentlyActiveArticle = prevArticle;
    });
}