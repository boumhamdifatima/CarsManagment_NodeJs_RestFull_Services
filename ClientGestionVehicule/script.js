function creerVehicule(){
    $("#zoneModificationVehicule").hide();
    $("#zoneSuppressionVehicule").hide();
    $("#zoneListeVehicule").hide();
    $("#zoneNouveauVehicule").show();	 
}
function modifierVehicule(){					
    $("#zoneSuppressionVehicule").hide();
    $("#zoneListeVehicule").hide();
    $("#zoneNouveauVehicule").hide();
    $("#zoneModificationVehicule").show();
}
function supprimerVehicule(){				
    $("#zoneModificationVehicule").hide();				
    $("#zoneListeVehicule").hide();
    $("#zoneNouveauVehicule").hide();
    $("#zoneSuppressionVehicule").show();
}
function listerVehicule(){				
    $("#zoneModificationVehicule").hide();
    $("#zoneSuppressionVehicule").hide();				
    $("#zoneNouveauVehicule").hide();
    $("#zoneListeVehicule").show();
    
    var noeudtBody = $("#idCorpsTableau");
    noeudtBody.empty();

    $.ajax({
        url: "http://localhost:3000/getAllVehicules",
        method: "get",
        dataType: "json",
        success: function(data) {
            $.each(data, function(index, vehicule) {
                var id = vehicule.Id;
                var marque = vehicule.Marque;
                var modele = vehicule.Modele;
                var annee = vehicule.Annee;
                var couleur = vehicule.Couleur;
                var image = "img/" + vehicule.Image;
                
                var noeudTr = $("<tr></tr>");
                var noeudTd1 = $("<td></td>");
                $(noeudTd1).text(id);
                $(noeudTr).append(noeudTd1);
                
                var noeudTd2 = $("<td></td>");
                $(noeudTd2).text(marque); 
                $(noeudTr).append(noeudTd2);

                var noeudTd3 = $("<td></td>");
                $(noeudTd3).text(modele);
                $(noeudTr).append(noeudTd3);
                
                var noeudTd4 = $("<td></td>");
                $(noeudTd4).text(annee);
                $(noeudTr).append(noeudTd4);

                var noeudTd5 = $("<td></td>");
                $(noeudTd5).text(couleur);
                $(noeudTr).append(noeudTd5);
                
                var noeudTd6 = $("<td></td>");
                var noeudTd61 = $("<img class='centered-image'/>");
                $(noeudTd61).attr({ src: image, width: "25%" });
                $(noeudTd6).append(noeudTd61);
                $(noeudTr).append(noeudTd6);
                
                
                
                $(noeudtBody).append(noeudTr);
            });
        },
        error: function(error) { 
            console.error("Erreur listerVehicule: ", JSON.stringify(error)); 
            alert("Erreur listerVehicule: " + JSON.stringify(error));
        }
    });
}

function rechercherModification() {
    var idVehicule = $("#txtIdM").val();
    $("#txtMarqueM").val(""); 
    $("#txtModeleM").val("");
    $("#txtAnneeM").val("");
    $("#txtCouleurM").val(""); 
    $("#txtImageM").val(""); 

    $.ajax({
        url: "http://localhost:3000/getVehicule/" + idVehicule,
        method: "get",
        dataType: "json",
        success: function (data) {
            if(data.message != "Véhicule(s) trouvé(s)"){ 
                alert(data.message);
            }
            else{
                var reponse = data.data;
                $("#txtMarqueM").val(reponse.Marque);
                $("#txtModeleM").val(reponse.Modele);
                $("#txtAnneeM").val(reponse.Annee);
                $("#txtCouleurM").val(reponse.Couleur);
                $("#txtImageM").val(reponse.Image);
                
            }
        },
        error: function (error) { 
            console.error("Erreur rechercherModification: ", JSON.stringify(error)); 
            alert("Erreur rechercherModification: " + JSON.stringify(error));
        }
    });
}

function rechercherSuppression() {
    var idVehicule = $("#txtIdS").val();
    $("#txtMarqueS").val(""); 
    $("#txtModeleS").val("");
    $("#txtAnneeS").val("");
    $("#txtCouleurS").val(""); 
    $("#txtImageS").val(""); 
    $.ajax({
        url: "http://localhost:3000/getVehicule/" + idVehicule,
        method: "get",
        dataType: "json",
        success: function (data) {
            if(data.message != "Véhicule(s) trouvé(s)"){ 
                alert(data.message);
            }
            else{
                var reponse = data.data;
                $("#txtMarqueS").val(reponse.Marque);
                $("#txtModeleS").val(reponse.Modele);
                $("#txtAnneeS").val(reponse.Annee);
                $("#txtCouleurS").val(reponse.Couleur);
                $("#txtImageS").val(reponse.Image);
            }
        },
        error: function (error) { 
            console.error("Erreur rechercherSuppression: ", JSON.stringify(error)); 
            alert("Erreur rechercherSuppression: " + JSON.stringify(error)); 
        }
    });
}

function enregistrer() {
    var idVehicule = $("#txtIdN").val();
    var marqueVehicule = $("#txtMarqueN").val();
    var modeleVehicule = $("#txtModeleN").val();
    var anneeVehicule = $("#txtAnneeN").val();
    var couleurVehicule = $("#txtCouleurN").val();
    var imageVehicule = $("#txtImageN").val();

    // Vérifier si tous les données sont saisis
    if (idVehicule === "" || marqueVehicule === "" || modeleVehicule === "" || anneeVehicule === "" || couleurVehicule === "" || imageVehicule === "") {
        alert("Veuillez remplir tous les champs.");
    
        // Mettre le focus sur le premier champ vide
        if (idVehicule === "") {
            $("#txtIdN").focus();
        } else if (marqueVehicule === "") {
            $("#txtMarqueN").focus();
        } else if (modeleVehicule === "") {
            $("#txtModeleN").focus();
        } else if (anneeVehicule === "") {
            $("#txtAnneeN").focus();
        } else if (couleurVehicule === "") {
            $("#txtCouleurN").focus();
        } else {
            $("#txtImageN").focus();
        }
    
        return;
    }

    //Vérifier taille Id
    if(!(idVehicule.length === 16)) {
        //alert("La longueur de l'ID doit être de 16 caractères.");

        // Mettre le focus sur l'élément avec l'ID "txtIdN"
        $("#txtIdN").focus();
        
        // Afficher un message d'erreur à côté de l'élément
        $("#txtIdN").next(".error-message").remove(); // Supprimer un message d'erreur existant
        $("<span class='error-message' style='color: red;'> La longueur de l'ID doit être de 16 caractères.</span>").insertAfter("#txtIdN");
    }else if (!/^\d{4}$/.test(anneeVehicule)) {
        //alert("L'année doit être un entier de 4 chiffres.");
        
        // Mettre le focus sur l'élément avec l'ID "txtAnneeN"
        $("#txtAnneeN").focus();
        
        // Afficher un message d'erreur à côté de l'élément avec la couleur rouge
        $("#txtAnneeN").next(".error-message").remove(); // Supprimer un message d'erreur existant
        $("<span class='error-message' style='color: red;'> L'année doit être un entier de 4 chiffres.</span>").insertAfter("#txtAnneeN");
    }else {   
        console.log(idVehicule + " " + marqueVehicule + " " + modeleVehicule + " " + anneeVehicule 
                                + " " + couleurVehicule + " " + imageVehicule );
        $.ajax({
            contentType: "application/json; charset=utf-8",
            processData: false,
            url: "http://localhost:3000/createVehicule",
            data: JSON.stringify( {
                id: idVehicule,
                marque: marqueVehicule,
                modele: modeleVehicule,
                annee: anneeVehicule,
                couleur: couleurVehicule,          
                image: imageVehicule
            }),
            method: "post",
            success: function (data) {
                $("#txtIdN").val(""); 
                $("#txtMarqueN").val(""); 
                $("#txtModeleN").val("");
                $("#txtAnneeN").val("");
                $("#txtCouleurN").val(""); 
                $("#txtImageN").val("");
                console.log(data);
                alert(data);
            },
            error: function (error) {
                console.error("Erreur Enregistrer: ", JSON.stringify(error)); 
                alert("Erreur Enregistrer: " + error.responseText); 
            }
        });
    }
}

function modifier() {
    var idVehicule = $("#txtIdM").val();
    var marqueVehicule = $("#txtMarqueM").val();
    var modeleVehicule = $("#txtModeleM").val();
    var anneeVehicule = $("#txtAnneeM").val();
    var couleurVehicule = $("#txtCouleurM").val();
    var imageVehicule = $("#txtImageM").val();
    $.ajax({
        url: "http://localhost:3000/updateVehicule/" + idVehicule, contentType: "application/json; charset=utf-8",
        processData: false,
        data: JSON.stringify ({
            id: idVehicule,
            marque: marqueVehicule,
            modele: modeleVehicule,
            annee: anneeVehicule,
            couleur: couleurVehicule,          
            image: imageVehicule
        }),
        method: "put",
        success: function(data) { 
            $("#txtIdM").val(""); 
            $("#txtMarqueM").val(""); 
            $("#txtModeleM").val("");
            $("#txtAnneeM").val("");
            $("#txtCouleurM").val(""); 
            $("#txtImageM").val(""); 
            alert(data);
        },
        error: function(error) { 
            console.error("Erreur Modifier: ", JSON.stringify(error)); 
            alert("Erreur Modifier: " + JSON.stringify(error)); 
        }
    });
}

function supprimer() {
    var idVehicule = $("#txtIdS").val();
    if (confirm("Êtes-vous sûr de vouloir supprimer le véhicule de code " + idVehicule)) {
        $.ajax({
            url : "http://localhost:3000/deleteVehicule/" + idVehicule,
            method : "delete",
            success: function(data) {
                console.log("Success: ", data); 
                $("#txtIdS").val(""); 
                $("#txtMarqueS").val(""); 
                $("#txtModeleS").val("");
                $("#txtAnneeS").val("");
                $("#txtCouleurS").val(""); 
                $("#txtImageS").val(""); 
                alert("Confirmation: " + data); 
            },
            error : function(error) {
                console.error("Erreur Supprimer: ", JSON.stringify(error)); 
                alert("Erreur Supprimer: " + JSON.stringify(error)); 
            }
        }); 
    } else { 
        alert("Suppression annulée");
    }
}

function validateIdLength(textIdent) {
    var input = document.getElementById(textIdent);
    var isValid = input.value.length === 16;
    input.setCustomValidity(isValid ? "" : "La longueur de l'ID doit être de 16 caractères.");
    return isValid;
}

