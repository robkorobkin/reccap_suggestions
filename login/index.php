<?php
	


// $un = "rob.korobkin@gmail.com";
$un = '';
$pw = "24School!";

// endpoint:
$url = 'https://arms.recoveryoutcomes.com/clients/manage-index/';
$url = 'https://arms.recoveryoutcomes.com/clients/manage-view/?uuid=7c2be2f0-d475-4749-832b-42ae952a149c'; // gary
$url = 'https://arms.recoveryoutcomes.com/account/auth/';

// token:
$token = "4a2565b18a57559b05cd3a10fa6b6f9e";


	echo "hello";


	$ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);

    curl_setopt($ch, CURLOPT_HEADER, TRUE);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);


    // HANDLE LOGIN
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,
            "form_id=zn-fOcduDcClANwcuFkFvtZrnmLCSYcxUOMgVOXaIxQ&username=" . $un . "&password=" . $password);

	curl_setopt($ch, CURLOPT_COOKIE, "username=" . $un);


    // curl_setopt($ch, CURLOPT_COOKIE, "token=" . $token);

    $head = curl_exec($ch);

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    echo $httpCode;

    echo $head;

    curl_close($ch);