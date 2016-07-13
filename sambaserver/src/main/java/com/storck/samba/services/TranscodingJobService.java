package com.storck.samba.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.storck.samba.dto.CreateJobRequest;
import com.storck.samba.dto.TranscodingJob;

@Path("/jobs")
public class TranscodingJobService {
	
	ZencoderService zencoder;
	
	public TranscodingJobService() {
		zencoder = new ZencoderService();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(CreateJobRequest req) {
		TranscodingJob job = zencoder.create(req.getInputPath());
		if(job != null) {
			return Response
					.ok(job, MediaType.APPLICATION_JSON_TYPE)
					.header("Access-Control-Allow-Origin", "*")
			        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
			        .build();
		} else {
			return Response.serverError().build();
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response list() {
		List<TranscodingJob> jobs = zencoder.list();
		if(jobs != null) {
			return Response
					.ok(jobs, MediaType.APPLICATION_JSON_TYPE)
					.header("Access-Control-Allow-Origin", "*")
			        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
			        .build();
		} else {
			return Response.serverError().build();
		}
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@PathParam("id") int id) {
		TranscodingJob job = zencoder.get(id);
		if(job != null) {
			return Response
					.ok(job, MediaType.APPLICATION_JSON_TYPE)
					.header("Access-Control-Allow-Origin", "*")
			        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
			        .build();
		} else {
			return Response.serverError().build();
		}
	}

}
