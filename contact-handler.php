<?php
/**
 * Traitement du formulaire de contact — Solidia Interim
 * Envoie les demandes reçues vers contact@solidia-interim.fr
 * Nécessite un hébergement supportant PHP (compatible hébergement mutualisé OVH).
 */

$destinataire = "contact@solidia-interim.fr";

// Honeypot anti-spam : champ invisible qui ne doit jamais être rempli par un humain
if (!empty($_POST['site_web'] ?? '')) {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

function nettoyer($valeur) {
    return htmlspecialchars(trim($valeur ?? ''), ENT_QUOTES, 'UTF-8');
}

$nom     = nettoyer($_POST['nom'] ?? '');
$societe = nettoyer($_POST['societe'] ?? '');
$tel     = nettoyer($_POST['tel'] ?? '');
$email   = nettoyer($_POST['email'] ?? '');
$profil  = nettoyer($_POST['profil'] ?? '');
$message = nettoyer($_POST['message'] ?? '');

$erreurs = [];
if ($nom === '') $erreurs[] = 'nom';
if ($tel === '') $erreurs[] = 'tel';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $erreurs[] = 'email';
if ($message === '') $erreurs[] = 'message';

if (!empty($erreurs)) {
    header('Location: contact.html?envoi=erreur');
    exit;
}

$sujet = "Nouvelle demande via le site" . ($societe !== '' ? " — $societe" : " — $nom");

$corps = "Nouvelle demande reçue via le formulaire de contact solidia-interim.fr\n\n"
       . "Nom & prénom : $nom\n"
       . "Société : " . ($societe !== '' ? $societe : '—') . "\n"
       . "Téléphone : $tel\n"
       . "E-mail : $email\n"
       . "Vous êtes : " . ($profil !== '' ? $profil : '—') . "\n\n"
       . "Message :\n$message\n";

$entetes = "From: Site Solidia Interim <no-reply@solidia-interim.fr>\r\n"
         . "Reply-To: $nom <$email>\r\n"
         . "Content-Type: text/plain; charset=UTF-8";

$envoye = mail($destinataire, $sujet, $corps, $entetes);

header('Location: contact.html?envoi=' . ($envoye ? 'ok' : 'erreur'));
exit;
