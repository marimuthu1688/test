app.controller('MainController', ['$scope', function($scope) {
  $scope.title = "Marimuthu's board";
  $scope.lists = JSON.parse(localStorage.getItem("lists"));
    var i,ii,tempList;$scope.newList='';$scope.newListBool=true;$scope.lightbox=false;$scope.prevCardEdit=false;$scope.newCardContent=new Array();$scope.addCardIndex=new Array();$scope.editCardContent=new Array();$scope.editCardIndex=new Array();$scope.editList=new Array();$scope.editListIndex=new Array();$scope.cardTitleHover=new Array();$scope.editListContent=new Array();$scope.cardHover=new Array();$scope.sortableOptionsList=new Array();$scope.prevEditCardId=new Array();

    $scope.initiate=function(){
      i=0;
      $scope.lists.forEach(function(list) {
      $scope.addCardIndex[i]=true;
      $scope.editListIndex[i]=true;
      $scope.cardTitleHover[i]=true;
      $scope.editList[i]='';
      $scope.editListContent[i]=list.name;
      $scope.cardHover[i]=new Array();
      $scope.editCardContent[i]=new Array();
      $scope.editCardIndex[i]=new Array();
      ii=0;
      list.cards.forEach(function(card) {
        $scope.editCardIndex[i][ii]=true;
        $scope.cardHover[i][ii]=true;
        $scope.editCardContent[i][ii]=card.content;
        ii++;
      });
      i++;
    });
    localStorage.setItem("lists", JSON.stringify($scope.lists));
    };

    $scope.initiate();


    $scope.onCardInput=function(parentIndex,index){
      var id="#editCardContent"+parentIndex+''+index;
      var idValueLength=$(id).val().length;
      console.log("Length ->"+idValueLength);
      var idNumLines=Math.round(idValueLength/35);idNumLines+=2;
      var idHeight=idNumLines*25;
      $(id).css('height',idHeight+"px");
    };

    $scope.onAddCardInput=function(index){
      var id="#addCardContent"+index;
      var idValueLength=$(id).val().length;
      console.log("Length ->"+idValueLength);
      var idNumLines=Math.round(idValueLength/35);idNumLines+=2;
      var idHeight=idNumLines*25;
      $(id).css('height',idHeight+"px");
    };


    $scope.editCard = function(parentIndex,index) {
      if ($scope.prevCardEdit) {
        $scope.editCardIndex[$scope.prevEditCardId[0]][$scope.prevEditCardId[1]]=true;
      }
      $scope.prevCardEdit=true;
      $scope.prevEditCardId[0]=parentIndex;$scope.prevEditCardId[1]=index;
      $scope.editCardIndex[parentIndex][index]=false;
      $scope.cardHover[parentIndex][index]=true;
      var id="#editCardContent"+parentIndex+''+index;
      $scope.onCardInput(parentIndex,index);
      setTimeout(function(){$(id).focus();$(id).select();},0);
      console.log("Textarea ID ->"+id);
      console.log("editCardContent ->"+$scope.editCardIndex[parentIndex][index]);
      console.log("Hover Out card ->"+index);
      $scope.lightbox=true;
      var idd="#editCardContent"+parentIndex+''+index;
      $(idd).css({"position":"relative","z-index":"2","padding":"8px","border-radius":"3px"});
      idd="#cardEditPanel"+parentIndex+''+index;
      $(idd).css({"position":"relative","z-index":"2"});
     };

    $scope.cancelEdit = function() {
      $scope.editCardIndex[$scope.prevEditCardId[0]][$scope.prevEditCardId[1]]=true;
      $scope.prevCardEdit=false;
      $scope.lightbox=false;
      id="#cardEditPanel"+$scope.prevEditCardId[0]+''+$scope.prevEditCardId[1];
      $(id).css({"position":"inherit","z-index":"0"});
    };

    $scope.cancelEditCard = function(parentIndex,index) {
      $scope.editCardIndex[parentIndex][index]=true;
      $scope.prevCardEdit=false;
      $scope.lightbox=false;
      id="#cardEditPanel"+parentIndex+''+index;
      $(id).css({"position":"inherit","z-index":"0"});
    };

    $scope.saveCard = function(parentIndex,index) {
      $scope.lists[parentIndex].cards[index].content=$scope.editCardContent[parentIndex][index];
      $scope.editCardIndex[parentIndex][index]=true;
      console.log("Saved ->"+$scope.editCardContent);
      console.log("Hover Out card ->"+index);
      $scope.prevCardEdit=false;
      $scope.lightbox=false;
      id="#cardEditPanel"+parentIndex+''+index;
      $(id).css({"position":"inherit","z-index":"0"});
      $scope.initiate();
    };

    $scope.deleteCard = function(parentIndex,index) {
      $scope.lists[parentIndex].cards.splice(index, 1);
      console.log("Card Deleted->"+index);
      $scope.initiate();
    };

    $scope.addCardProcess = function(index) {
    $scope.addCardIndex[index]=false;
    console.log("Card adding...");
    };

    $scope.cancelAdd = function(index) {
    $scope.addCardIndex[index]=true;
    console.log("Cancelled");
    };

    $scope.addCard = function(index,icontent) {
    newCard={
      cardid:'5',
      content: icontent,
      pubdate: new Date('2017', '04', '01')
    };
    $scope.lists[index].cards.push(newCard);
    newCardIndex=$scope.lists[index].cards.length-1;

    console.log("Card added ->"+newCard.cardid);
    $scope.newCardContent[index]="";
    $scope.addCardIndex[index]=true;
    $scope.editCardIndex[index][newCardIndex]=true;
    $scope.cardHover[index][newCardIndex]=true;
    console.log("Numbet of cards ->"+newCardIndex);
    $scope.initiate();
    };

    $scope.addList = function(name) {
    $scope.newListBool=false;
    tempList={
      id:'2',
      name: name,
      pubdate: new Date('2017', '04', '01'),
      cards:[{
      cardid:'2',
      content: 'Sample Card',
      pubdate: new Date('2017', '04', '01')
      }]
    };
    console.log("List name ="+name);
    console.log("tempList ="+tempList);
    $scope.lists.push(tempList);
    console.log("Adding List...");
    console.log("Added Card -> "+tempList.name);
    $scope.newList="";
    $scope.newListBool=true;
    localStorage.setItem("lists", JSON.stringify($scope.lists));
    $scope.initiate();

    };

    $scope.addNewListUI = function() {
    $scope.newListBool=false;
    };

    $scope.editListUI = function(index) {
    $scope.editListIndex[index]=false;
    $scope.editList[index]=$scope.lists[index].name;
    var id="#title-"+index;
    setTimeout(function(){$(id).focus();$(id).select();},0);
    console.log("indexbool "+$scope.editListIndex[index]);
    };


    $scope.saveList = function(index,conten) {
    console.log("Save index "+index+"\n"+"conten "+conten);
    $scope.lists[index].name=conten;
    console.log("Stored "+$scope.lists[index].name);
    console.log("indexbool "+$scope.editListIndex[index]);
    $scope.editListIndex[index]=true;
    $scope.editList[index]='';
    localStorage.setItem("lists", JSON.stringify($scope.lists));
    $scope.initiate();
    };

    $scope.cancelList = function() {
    $scope.newListBool=true;
    };

    $scope.cancelSaveList = function(index) {
    $scope.editListIndex[index]=true;
    };

    $scope.deleteList = function(index) {
      $scope.lists.splice(index, 1);
      localStorage.setItem("lists", JSON.stringify($scope.lists));
      $scope.initiate();
      console.log("List Deleted->"+index);
    };


  var tmpList = [];
  $scope.sortingLog = [];

  function createOptions (listName) {
    var _listName = listName;
    var options = {
      placeholder: "tempcard",
      connectWith: ".cards-scrollable",
      activate: function() {
          console.log("list " + _listName + ": activate");
      },
      beforeStop: function() {
          console.log("list " + _listName + ": beforeStop");
      },
      change: function() {
          console.log("list " + _listName + ": change");
      },
      create: function() {
          console.log("list " + _listName + ": create");
      },
      deactivate: function() {
          console.log("list " + _listName + ": deactivate");
      },
      out: function() {
          console.log("list " + _listName + ": out");
      },
      over: function() {
          console.log("list " + _listName + ": over");
      },
      receive: function() {
          console.log("list " + _listName + ": receive");
      },
      remove: function() {
          console.log("list " + _listName + ": remove");
      },
      sort: function() {
          console.log("list " + _listName + ": sort");
      },
      start: function() {
          console.log("list " + _listName + ": start");
      },
      stop: function() {
          console.log("list " + _listName + ": stop");
      },
      update: function() {
          console.log("list " + _listName + ": update");
          $scope.initiate();
          localStorage.setItem("lists", JSON.stringify($scope.lists));
      }
    };
    return options;
  }

    for (ii = 0; ii < $scope.lists.length; ii++) {
      $scope.sortableOptionsList.push(createOptions($scope.lists[ii].name));
    }

  $scope.logModels = function () {
    $scope.sortingLog = [];
    for (var ii = 0; ii < $scope.lists.length; ii++) {
    for (var i = 0; i < $scope.lists[ii].cards.length; i++) {
      var logEntry = $scope.lists[ii].cards[i].map(function (x) {
        return x.title;
      }).join(', ');
      logEntry = 'container ' + (i+1) + ': ' + logEntry;
      $scope.sortingLog.push(logEntry);
    }
    }
  };

}]);
