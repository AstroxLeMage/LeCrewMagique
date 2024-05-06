<?php
$client_id = 'os8f6dd5bavncfp96u3prr1hlvwncu';
$client_secret = 'l9hlc8pr7ek0kxgwdpzjamfwayzg8t';
$token = 'https://id.twitch.tv/oauth2/token';

$username = 'AstroxLeMage';

// Obtenez les informations sur la chaîne
$channel_url = "https://api.twitch.tv/helix/users?login=$username";
$ch = curl_init($channel_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Client-ID: ' . $client_id,
    'Authorization: Bearer ' . $token,
]);

$response_channel = curl_exec($ch);
curl_close($ch);

$channel_data = json_decode($response_channel, true);

if (isset($channel_data['data'][0])) {
    $user_id = $channel_data['data'][0]['id'];

    // Obtenez le statut de diffusion en direct
    $stream_url = "https://api.twitch.tv/helix/streams?user_id=$user_id";
    $ch = curl_init($stream_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Client-ID: ' . $client_id,
        'Authorization: Bearer ' . $token,
    ]);

    $response_stream = curl_exec($ch);
    curl_close($ch);

    $stream_data = json_decode($response_stream, true);

    if (isset($stream_data['data'][0])) {
        // La chaîne est en direct
        $is_live = true;
        $viewer_count = $stream_data['data'][0]['viewer_count'];
    } else {
        // La chaîne n'est pas en direct
        $is_live = false;
        $viewer_count = 0;
    }

    // Obtenez le nombre d'abonnés actifs
    $subscribers_url = "https://api.twitch.tv/helix/subscriptions?broadcaster_id=$user_id";
    $ch = curl_init($subscribers_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Client-ID: ' . $client_id,
        'Authorization: Bearer ' . $token,
    ]);

    $response_subscribers = curl_exec($ch);
    curl_close($ch);

    $subscribers_data = json_decode($response_subscribers, true);
    $subscriber_count = isset($subscribers_data['total']) ? $subscribers_data['total'] : 0;

    // Affichez les informations comme vous le souhaitez
    echo "Statut de la chaîne : " . ($is_live ? "En direct" : "Hors ligne") . "<br>";
    echo "Nombre de spectateurs : $viewer_count<br>";
    echo "Nombre d'abonnés actifs : $subscriber_count<br>";
} else {
    echo "Impossible de récupérer les informations de la chaîne.";
}
?>