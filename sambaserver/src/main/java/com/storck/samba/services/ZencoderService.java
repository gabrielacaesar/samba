package com.storck.samba.services;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.storck.samba.dto.JobStatus;
import com.storck.samba.dto.TranscodingJob;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;

public class ZencoderService {
	
	static private final String API_KEY = "c38f948c48c2dc98c4d1641a800d821f";
	
	private Client client;
	
	public ZencoderService() {
		client = Client.create();
	}

	public TranscodingJob create(String inputFile) {
		try {
			ClientResponse response = client.resource("https://app.zencoder.com/api/v2/jobs.json?")
					.header("Zencoder-Api-Key", API_KEY)
					.accept("application/json")
					.post(ClientResponse.class, generateCreateJobPayload(inputFile));
			
			if(response.getStatus() == 201) { //CREATED
				TranscodingJob job = parse(response.getEntity(String.class));
				if(job != null) {
					job.setInputPath(inputFile);
				}
				return job;
			} else {
				return null;
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public TranscodingJob get(int id) {
		try {
			ClientResponse response = client.resource("https://app.zencoder.com/api/v2/jobs/" + id + ".json?")
					.header("Zencoder-Api-Key", API_KEY)
					.accept("application/json")
					.get(ClientResponse.class);
			
			if(response.getStatus() == 200) { //OK
				TranscodingJob job = parse(response.getEntity(String.class));
				if(job != null) {
					job.setProgress(getProgress(id));
				}
				return job;
			} else {
				return null;
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	private Double getProgress(int id) {
		try {
			ClientResponse response = client.resource("https://app.zencoder.com/api/v2/jobs/" + id + "/progress.json?")
					.header("Zencoder-Api-Key", API_KEY)
					.accept("application/json")
					.get(ClientResponse.class);
			
			if(response.getStatus() == 200) { //OK
				JSONObject jsonResponse = new JSONObject(response.getEntity(String.class));
				if(jsonResponse.has("progress")) {
					return jsonResponse.getDouble("progress");
				} else if(jsonResponse.has("state") && jsonResponse.getString("state").equals("finished")) {
					return 100d;
				}
			}
			return null;
		} catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	private String generateCreateJobPayload(String inputFile) throws JSONException {
		JSONObject payload = new JSONObject();
		payload.put("input", inputFile);
		return payload.toString();
	}
	
	private TranscodingJob parse(String jobJson) throws Exception {
		TranscodingJob job = new TranscodingJob();
		JSONObject json = new JSONObject(jobJson).getJSONObject("job");
		
		if(json.has("id")) {
			job.setId(json.getInt("id"));
		}
		if(json.has("created_at")) {
			job.setCreatedAt(json.getString("created_at"));
		}
		if(json.has("finished_at")) {
			job.setFinishedAt(json.getString("finished_at"));
		}
		if(json.has("state")) {
			job.setState(JobStatus.valueOf(json.getString("state").toUpperCase()));
		}
		
		String outputKey = null;
		if(json.has("outputs")) {
			outputKey = "outputs";
		} else if(json.has("output_media_files")) {
			outputKey = "output_media_files";
		}
		if(outputKey != null) {
			JSONArray outputsJson = json.getJSONArray(outputKey);
			job.setOutputPath(outputsJson.getJSONObject(0).getString("url"));
		}
		
		if(json.has("input_media_file")) {
			job.setInputPath(json.getJSONObject("input_media_file").getString("url"));
		}
		
		return job;
	}

}
